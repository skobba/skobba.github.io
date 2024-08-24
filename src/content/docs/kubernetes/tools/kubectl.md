# kubectl

## Field Selector
```sh
kubectl get pods -n argocd --field-selector status.phase=Failed

kubectl delete pods -n argocd --field-selector status.phase=Failed
```

## Install bin on linux
```
# Download and verify
curl -LO https://dl.k8s.io/release/v1.29.1/bin/linux/amd64/kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check

# Install
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install (no root)
chmod +x kubectl
mkdir -p ~/.local/bin
mv ./kubectl ~/.local/bin/kubectl
# and then append (or prepend) ~/.local/bin to $PATH
```

## Autocomplete in zsh
```
source <(kubectl completion zsh)  # setup autocomplete in zsh into the current shell
echo "[[ $commands[kubectl] ]] && source <(kubectl completion zsh)" >> ~/.zshrc # add autocomplete permanently to your zsh shell
```

## Cheat sheet
Ref.: [https://kubernetes.io/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

## Patch
```sh
kubectl patch svc php-apache -p '{"spec":{"externalIPs":["127.0.0.1"]}}'
kubectl patch svc php-apache -p '{"spec":{"externalIPs":["10.153.134.11"]}}'

kubectl patch deployment mydeploy -n myns -p '
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mydeploy
  namespace: myns
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: mydeploy
          resources:
            limits:
              cpu: 500m
            requests:
              cpu: 200m
'
```

## Resources
```
clusterrole
clusterrolebinding
configmap
cronjob
deployment
ingress
job
namespace
poddisruptionbudget
priorityclass
quota
role
rolebinding
secret
secret docker-registry
secret generic
secret tls
service
service clusterip
service externalname
service loadbalancer
service nodeport
serviceaccount
```
