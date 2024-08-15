# Setup on Proxmox
```
┌──────────────────────────────────────────────────────────────────┐
│  Proxmox                                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│ │  LXC1       │ │  LXC2       │ │  LXC3       │ │  LXC4       │  │
│ │ ┌─────────┐ │ │ ┌─────────┐ │ │ ┌─────────┐ │ │ ┌─────────┐ │  │
│ │ │ Node1   │ │ │ │ Node2   │ │ │ │ Node3   │ │ │ │ Node4   │ │  │
│ │ ├─────────┤ │ │ ├─────────┤ │ │ ├─────────┤ │ │ ├─────────┤ │  │
│ │ │ Pod1    │ │ │ │ Pod3    │ │ │ │ Pod5    │ │ │ │ Pod7    │ │  │
│ │ │ Pod2    │ │ │ │ Pod4    │ │ │ │ Pod6    │ │ │ │ Pod8    │ │  │
│ │ └─────────┘ │ │ └─────────┘ │ │ └─────────┘ │ │ └─────────┘ │  │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## Running Kubernetes on Linux Containers (LXC)
Ref
* https://github.com/MarijnKoesen/kubernetes-in-proxmox-with-kubeadm-lxc-and-wireshark/blob/master/README.md
* https://kvaps.medium.com/run-kubernetes-in-lxc-container-f04aa94b6c9c
* [proxmox-lxc-docker-fuse-overlayfs](https://c-goes.github.io/posts/proxmox-lxc-docker-fuse-overlayfs)

## Step 1: Prepare the proxmox (7.0-11) host

Ensure the following modules are loaded:
```
cat /proc/sys/net/bridge/bridge-nf-call-iptables
```
or
```
grep 'BRIDGE_NETFILTER' /boot/config-$(uname -r)
CONFIG_BRIDGE_NETFILTER=y
```

Ensure overlay module is loaded
```
lsmod | grep overlay
```

enable the kernel module with
```
modprobe overlay
```
or add overlay to systemd :
```
echo "overlay" > /etc/modules-load.d/overlay.conf
```
or add to startup
```
echo overlay >> /etc/modules
```

Now make sure swapiness is on 0, so that swap will not be used, otherwise kubernetes will not start:

```
cat /proc/sys/vm/swappiness
[should be 0]
```

Define the new one

```
sysctl vm.swappiness=0
```

Disable SWAP, it'll take some times to clean the SWAP area
```
swapoff -a
```
Now wait for swap to be empty.

Set hashsize and nf_conntrack_max
```
/sbin/sysctl -w net.netfilter.nf_conntrack_max=524288
echo "131072" > /sys/module/nf_conntrack/parameters/hashsize

and check values
/proc/sys/net/nf_conntrack_max
cat /sys/module/nf_conntrack/parameters/hashsize
```

## Step 2: Creating a privileged LXC kubernetes container

1) Create a new container in proxmox, making sure to give it 0 swap, and make it a privileged container
```
pct create 200 /var/lib/vz/template/cache/ubuntu-18.04-standard_18.04.1-1_amd64.tar.gz \
    -arch amd64 \
    -ostype ubuntu \
    -hostname k8s \
    -features keyctl=1,nesting=1 \
    -cores 2 \
    -memory 4096 \
    -swap 0 \
    -storage local-zfs \
    -password \
    -unprivileged 0 \
    -net0 name=eth0,bridge=vmbr0,gw=10.10.2.1,ip=10.10.2.200/24,type=veth
```

3) Edit the config file `/etc/pve/lxc/$ID.conf` and add the following part if needed
```
lxc.apparmor.profile: unconfined
lxc.cgroup.devices.allow: a
lxc.cap.drop:
lxc.mount.auto: "proc:rw sys:rw"
```

If you are using zfs on proxmos, make sure to create a ext4 volume, as zfs is not supported with kubeadm
See: https://github.com/corneliusweig/kubernetes-lxd

List zpools with ```zpool list```.

Create zfs volumes:
```
zfs create -V 50G rpool/my-dockervol
zfs create -V 5G rpool/my-kubeletvol
mkfs.ext4 /dev/zvol/rpool/my-dockervol
mkfs.ext4 /dev/zvol/rpool/my-kubeletvol
```

Mount it inside of the container:
Ref. security: https://stgraber.org/2017/06/15/custom-user-mappings-in-lxd-containers/
```
pct set 200 -mp0 /dev/zvol/rpool/my-dockervol,mp=/var/lib/docker,backup=0
pct set 200 -mp1 /dev/zvol/rpool/my-kubeletvol,mp=/var/lib/kubelet,backup=0
```

### Install docker
```
apt-get update --allow-releaseinfo-change

apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  
apt-get update

# For later debian
apt-get -y install docker-ce docker-ce-cli containerd.io

# For ubuntu 18
apt-get -y install docker.io
```

Check docker storage driver
```
docker info
```

Change the storage driver to overlay2.
```
echo -e '{\n  "storage-driver": "overlay2"\n}' >> /etc/docker/daemon.json
```

Test
```
docker run hello-world
```

Make sure conntrack is running
```
conntrack -L
```

### Install kubernetes

```
apt-get update --allow-releaseinfo-change
apt-get install -y apt-transport-https curl
apt-get install -y gnupg

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
```

For later debian
```
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-bionic main
EOF
```

For ubuntu 18
```
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
```

Fix some other small issues and create the following rc.local file:

Create /dev/kmsg and run make-rshared (then add to /etc/rc.local)

NB: chmod +x /etc/rc.local
```
#!/bin/sh -e

# Kubeadm 1.15 needs /dev/kmsg to be there, but it's not in lxc, but we can just use /dev/console instead
# see: https://github.com/kubernetes-sigs/kind/issues/662
if [ ! -e /dev/kmsg ]; then
    ln -s /dev/console /dev/kmsg
fi

# https://medium.com/@kvaps/run-kubernetes-in-lxc-container-f04aa94b6c9c
mount --make-rshared /
```


Install kubernetes
```
apt-get update
apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl
```

Pull images
```
kubeadm config images pull
...
[config/images] Pulled k8s.gcr.io/kube-apiserver:v1.22.2
[config/images] Pulled k8s.gcr.io/kube-controller-manager:v1.22.2
[config/images] Pulled k8s.gcr.io/kube-scheduler:v1.22.2
[config/images] Pulled k8s.gcr.io/kube-proxy:v1.22.2
[config/images] Pulled k8s.gcr.io/pause:3.5
[config/images] Pulled k8s.gcr.io/etcd:3.5.0-0
[config/images] Pulled k8s.gcr.io/coredns/coredns:v1.8.4
```

Make sure kubelet can connect
```
echo "KUBELET_EXTRA_ARGS=--node-ip=10.10.2.200" >> /etc/default/kubelet
```

Create cluster
```
kubeadm init
```
or
```
--service-cidr string     Default: "10.96.0.0/12"

kubeadm init --pod-network-cidr=10.250.0.0/16 --apiserver-advertise-address 10.10.2.210 --ignore-preflight-errors=all
```



## Just some refs
* https://docs.docker.com/storage/storagedriver/overlayfs-driver/#prerequisites
* https://stackoverflow.com/questions/54128045/errors-while-creating-master-in-cluster-of-kubernetes-in-lxc-container
* https://www.youtube.com/watch?v=nfPf0pJ1YLI&ab_channel=JustmeandOpensource
* https://github.com/debiasej/k8s-lxc/blob/master/lxd-provisioning/profile-config

Create LXC from profile (how is this done on Proxmox+?)
```
lxc launch images:ubuntu/16.04 CONTAINER_NAME --profile PROFILE_NAME
```

LXC Profile
```
config:
  limits.cpu: "2"
  limits.memory: 2GB
  limits.memory.swap: "false"
  linux.kernel_modules: ip_tables,ip6_tables,netlink_diag,nf_nat,overlay,br_netfilter
  raw.lxc: "lxc.apparmor.profile=unconfined\nlxc.cap.drop= \nlxc.cgroup.devices.allow=a\nlxc.mount.auto=proc:rw
    sys:rw"
  security.privileged: "true"
  security.nesting: "true"
description: LXD profile for Kubernetes
devices:
  eth0:
    name: eth0
    nictype: bridged
    parent: lxdbr0
    type: nic
  root:
    path: /
    pool: default
    type: disk
name: k8s
used_by: []
```
## Errors
### /dev/kmsg
```
"Failed to run kubelet" err="failed to run Kubelet: failed to create kubelet: open /dev/kmsg: no such file or directory"
```
### preflight failed

```
error execution phase preflight: [preflight] Some fatal errors occurred:
        [ERROR SystemVerification]: failed to parse kernel config: unable to load kernel module: "configs", output: "modprobe: FATAL: Module configs not found in directory /lib/modules/5.11.22-4-pve\n", err: exit status 1
```

Is /lib/modules/ mounted?
```
XXX=lxc id
Y=mount point id (probably 3, check for next free id in proxmox)
pct set XXX --mpY /lib/modules/$(uname -r),mp=/lib/modules/$(uname -r),ro=1
```

### /dev/kmsg - Permission denied
```
root@kworker153:~# /dev/kmsg
-bash: /dev/kmsg: Permission denied
```

nf_conntrack

* [Tuning nf_conntrack](https://ixnfo.com/en/tuning-nf_conntrack.html)
* [Kubernetes in LXC/LXD containers due to kube-proxy and nf_conntrack_max values](https://www.claudiokuenzler.com/blog/1106/unable-to-deploy-rancher-managed-kubernetes-cluster-lxc-lxd-nodes)
* [Persisting nf_conntrack_max Across Reboots](https://serverfault.com/questions/161530/persisting-nf-conntrack-max-across-reboots)



