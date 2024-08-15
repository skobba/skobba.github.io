# kali
Kubernetes tail. Streams logs from all containers of all matched pods. Match pods by service, replicaset, deployment, and others. Adjusts to a changing cluster - pods are added and removed from logging as they fall in or out of the selection.

## Install
```
# Brew
$ brew tap boz/repo
$ brew install boz/repo/kail

# kubectl
kubectl krew install tail
kubectl tail -h
```
