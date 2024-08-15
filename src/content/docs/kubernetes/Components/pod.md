# Pod

## Create
```sh
kubectl run pod1 --image=httpd:2.4.41-alpine --dry-run=client -oyaml > pod1.yaml

kubectl create -f pod1.yaml
```

## Set Resourse Limits
```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: resource-checker
  name: resource-checker
spec:
  containers:
  - image: httpd:alpine
    name: pod1
    resources:
      requests:
        memory: "30Mi"
        cpu: "30m"
      limits:
        memory: "30Mi"
        cpu: "300m"
  dnsPolicy: ClusterFirst
  restartPolicy: Always
```
