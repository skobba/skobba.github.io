# Setup

## View Services
```
systemctl list-units -t service --state running
```

## Static IP
vi /etc/network/interfaces
```
auto enp5s0f0
iface enp5s0f0 inet static
    address 10.10.9.250/24
    gateway 10.10.9.1

systemctl restart networking
```

## Enable ssh
```
vi /etc/ssh/ssh_config
PermitRootLogin yes

systemctl restart ssh
```

## Root enable sudo
```
su -l
adduser <your_username_here> sudo
logout
```

## Bridge
```
apt-get -y install bridge-utils

# Create a Bridge Interface
ip link add br0 type bridge

# Configure the Bridge Interface
ip addr add 192.168.1.100/24 dev br0

# Up
ip link set dev br0 up

vi /etc/default/lxd-bridge
USE_LXD_BRIDGE="false"
LXD_BRIDGE="br0"


brctl show

```
