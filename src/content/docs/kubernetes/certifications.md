# Certifications

## CKAD - Certified Kubernetes Application Developer
### Exam
* 120 min / 6 min per question
* User imperative commands instead of yaml
* Learn how to patch specs

### What´s on the exam
* __Core Concepts:__ API primitives & basic Pods - 13%
* __Configuration:__ resource requests & limits, SecurityContexts, ConfigMaps, Secrets, ServiceAccounts - 18%
* __Multi-Container Pods:__ ambassador, adapter, and sidecar patterns - 10%
* __Observability:__ liveness & readiness probes, logging, monitoring - 18%
* __Pod Design:__ rollouts & rollbacks, Jobs & CronJobs, metadata (labels, selectors, annotations) - 20%
* __Services & Networking:__ Service configs, NetworkPolicies - 13%
* __State Persistence:__ PersistentVolumeClaims - 8%

### Tools
Only these web sites are allowed:
* https://kubernetes.io/docs
* https://kubernetes.io/blog
* https://helm.sh/docs
* mousepad (Pref->Editor - set width=2 and spaces, not tabs)

### Important commands
```sh
k get namespaces -o jsonpath='{.items[*].metadata.name}'
k run pod1 --image nginx --namespace pluto --labels "app=myapp"
k expose -n pluto pod1 --port 3333 --target-port 80

k run tmpsh -i --tty --rm --image nginx:alpine --restart=Never -- /bin/bash
k run tmpsh -i --tty --rm --image nginx:alpine --restart=Never -- sh -c "ping ipinfo.io"

k exec -it mypod -n myns -- sh

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: 
EOF

helm upgrade --install -n myns myrelease bitnami/nginx --version 18.1.10
helm install myrelease bitnami/nginx --set replicaCount=2


```

### Curriculum
![k8s-ckad.png](k8s-ckad.png)
