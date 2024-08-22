# Deployment
* Manage pods lifecycles
* Ensure high availability
* Enable scaling

## Quick deploy and expose
Create a deployment with a service and a pod, and then expose the pod on the node
```sh
kubectl create deployment nginx-skobba --image=nginx --port=80

kubectl expose pod nginx-skobba-xxxxxxx --type NodePort --port 80

# or

kubectl expose deployment nginx-skobba --type=NodePort --port=80
```

## Sample with Volumes
First create [pv](/docs/kubernetes/components/pv) and [pvc](/docs/kubernetes/components/pvc).
```sh
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: host-path-deploy
  name: host-path-deploy
  namespace: skobba
spec:
  replicas: 1
  selector:
    matchLabels:
      app: host-path-deploy
  template:
    metadata:
      labels:
        app: host-path-deploy
    spec:
      containers:
      - image: nginx:alpine
        name: nginx
        volumeMounts:
        - name: host-path-volume
          mountPath: /myvol
      volumes:
      - name: host-path-volume
        persistentVolumeClaim:
          claimName: host-path-pvc
EOF
```

## History
```sh
# Show history
kubectl rollout history deployment mydep

# Show a spesific revision
kubectl rollout history deployment mydep --revision=3

# Show status
kubectl rollout status deployment mydep
```

## Rollback
```sh
# Rollback one (not the new rev number)
kubectl rollout undo deployment mydep

# Rollback to a spesific version
kubectl rollout undo deployment mydep --to-revision=3
```

## Convert pod into deployment
1) Export the pod
```sh
kubectl get pod -n myns mypod -oyaml
```
2) Manually Remove Unnecessary Fields:
```
metadata.creationTimestamp
metadata.resourceVersion
metadata.selfLink
metadata.uid
metadata.annotations (if it contains auto-generated data like kubectl.kubernetes.io/last-applied-configuration)
status (the entire status section can be removed)
spec.nodeName
spec.serviceAccountName.
```

3) Change kind from Pod to Deployment:
```yaml
kind: Deployment
```

4) Add the apiVersion for Deployments:
```yaml
apiVersion: apps/v1
kind: Deployment
```

5) Wrap the spec in a template and add selector:
* Under the spec field, add a template field, and move the entire original pod spec under it.
* Template field should contain the pod's metadata and spec.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mydep
spec:
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: mycontainer
        image: nginx
        ports:
        - containerPort: 80
```

6) Add a replicas field to define how many replicas you want:
* Set this under the spec field at the same level as selector.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mydep
spec:
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: mycontainer
        image: nginx
        ports:
        - containerPort: 80
```

### Sample
Pod:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - name: mycontainer
    image: nginx
    ports:
    - containerPort: 80
```

Deployment:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mydep
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: mycontainer
        image: nginx
        ports:
        - containerPort: 80

```

## Check Resource Limits
```sh
kubectl get deployments --all-namespaces -o custom-columns=NAMESPACE:.metadata.namespace,NAME:.metadata.name,CPU_REQUEST:.spec.template.spec.containers[*].resources.requests.cpu,MEM_REQUEST:.spec.template.spec.containers[*].resources.requests.memory,CPU_LIMIT:.spec.template.spec.containers[*].resources.limits.cpu,MEM_LIMIT:.spec.template.spec.containers[*].resources.limits.memory
```
