# config
## Context
List and get current:
```
kubectl config get-contexts
kubectl config current-context
```

## Storage
```
mkdir ~/.kube
```

## Switch between configs
```
export KUBECONFIG=/home/gjermund.skobba/.kube/config_stage
export KUBECONFIG=/home/gjermund.skobba/.kube/config_prod
```
