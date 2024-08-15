# MetalLb
* [https://metallb.universe.tf/](https://metallb.universe.tf/)

MetalLB hooks into your Kubernetes cluster, and provides a network load-balancer implementation. In short, it allows you to create Kubernetes services of type LoadBalancer in clusters that don’t run on a cloud provider, and thus cannot simply hook into paid products to provide load balancers.
## Preparations
__Enable IPVs with edit__
```
kubectl edit configmap -n kube-system kube-proxy

and set:

apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "ipvs"
ipvs:
  strictARP: true

```

__Enable IPVs with sed__
```
# see what changes would be made, returns nonzero returncode if different
kubectl get configmap kube-proxy -n kube-system -o yaml | \
sed -e "s/strictARP: false/strictARP: true/" | \
kubectl diff -f - -n kube-system

# actually apply the changes, returns nonzero returncode on errors only
kubectl get configmap kube-proxy -n kube-system -o yaml | \
sed -e "s/strictARP: false/strictARP: true/" | \
kubectl apply -f - -n kube-system
```

## Install (helm)
```
helm repo add metallb https://metallb.github.io/metallb
helm repo update
kubectl create ns metallb-system
helm install metallb metallb/metallb -f values.yaml -n metallb-system
```

values.yaml
```
address-pools:
  - name: default
    protocol: layer2
    addresses:
      - 10.10.9.125-10.10.9.129
```

ipaddresspool.yaml
```
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: cheap
  namespace: metallb-system
spec:
  addresses:
  - 10.10.9.125-10.10.9.129
```

Check
```
kubectl describe -n metallb-system ipaddresspool
```


## Install (yaml)
```
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.12.1/manifests/namespace.yaml

kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.12.1/manifests/metallb.yaml
```

# Create Config
Create config from stdin, the ip-range must be in the same range as the nodes.

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - 10.10.2.240-10.10.2.250
EOF
```

