# Security Context

## Usage
* Set the user ID (UID) to 1001 and group ID (GID) to 3001.
* Ensure that the container cannot escalate privileges.
* The Pod should have the capability to allow execution of binaries with the NET_ADMIN capability.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
  namespace: development
spec:
  containers:
  - name: nginx
    image: nginx:1.19
    securityContext:
      runAsUser: 1001
      runAsGroup: 3001
      allowPrivilegeEscalation: false
      capabilities:
        add: ["NET_ADMIN"]
```

## Usage (2)
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
    supplementalGroups: [4000]
  volumes:
  - name: sec-ctx-vol
    emptyDir: {}
  containers:
  - name: sec-ctx-demo
    image: busybox:1.28
    command: [ "sh", "-c", "sleep 1h" ]
    volumeMounts:
    - name: sec-ctx-vol
      mountPath: /data/demo
    securityContext:
      allowPrivilegeEscalation: false
```

Create and check:
```sh
kubectl apply -f https://k8s.io/examples/pods/security/security-context.yaml

# Check
kubectl get pod security-context-demo

# Enter
kubectl exec -it security-context-demo -- sh

# List the running processes:
ps
```
