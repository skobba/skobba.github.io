# Deployment

## Basic nginx deployment
```
kubectl create deployment nginx-demo2 --image=nginx --port=80
```

## Nginx deployment labels
Unlike names and UIDs, labels do not provide uniqueness. In general, we expect many objects to carry the same label(s).

Via a label selector, the client/user can identify a set of objects. The label selector is the core grouping primitive in Kubernetes.

Create nginx sample from stdin
```
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx
  name: nginx-demo-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx
        name: nginx-demo-container
EOF
```

## Check Resource Limits
```sh
kubectl get deployments --all-namespaces -o custom-columns=NAMESPACE:.metadata.namespace,NAME:.metadata.name,CPU_REQUEST:.spec.template.spec.containers[*].resources.requests.cpu,MEM_REQUEST:.spec.template.spec.containers[*].resources.requests.memory,CPU_LIMIT:.spec.template.spec.containers[*].resources.limits.cpu,MEM_LIMIT:.spec.template.spec.containers[*].resources.limits.memory
```
