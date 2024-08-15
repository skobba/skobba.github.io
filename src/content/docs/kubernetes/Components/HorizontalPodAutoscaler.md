# HorizontalPodAutoscaler
Ref.: [https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)

First: Install metrics-server

## Run and expose php-apache server
### Label Nodes
Scales on only two nodes.
```
kubectl label nodes kind-worker2 php-apache-node=true
kubectl label nodes kind-worker3 php-apache-node=true
```

### Create Deplpyment
```sh
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php-apache
spec:
  selector:
    matchLabels:
      run: php-apache
  template:
    metadata:
      labels:
        run: php-apache
    spec:
      containers:
      - name: php-apache
        image: registry.k8s.io/hpa-example
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: 500m
          requests:
            cpu: 200m

      ## nodeAffinity
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: php-apache-node
                operator: In
                values:
                - "true"

      ## nodeSelector
      # nodeSelector:
      #  php-apache-node: "true"

---
apiVersion: v1
kind: Service
metadata:
  name: php-apache
  labels:
    run: php-apache
spec:
  # ports:
  # - port: 80
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30009
  selector:
    run: php-apache
  type: NodePort
EOF
```

## Create the HorizontalPodAutoscaler 
* Creates a HorizontalPodAutoscaler that maintains between 1 and 10 replicas of the Pods controlled by the php-apache Deployment above.
* The HPA controller will increase and decrease the number of replicas (by updating the Deployment) to maintain an average CPU utilization across all Pods of 50%.
* The Deployment then updates the ReplicaSet - this is part of how all Deployments work in Kubernetes - and then the ReplicaSet either adds or removes Pods based on the change to its .spec.

Since each pod requests 200 milli-cores by kubectl run, this means an average CPU usage of 100 milli-cores. See Algorithm details for more details on the algorithm.

```
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10
```

## Increase the load
To do this, you'll start a different Pod to act as a client. The container within the client Pod runs in an infinite loop, sending queries to the php-apache service.

Watch:
```
watch kubectl describe hpa php-apache

watch kubectl get hpa
```

Load:
```
kubectl run -i --tty load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"
```

## Create Declarative 
```yml
cat <<EOF | kubectl apply -f -
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: php-apache
  namespace: default
spec:
  behavior:
    scaleDown:
      policies:
      - periodSeconds: 60
        type: Pods
        value: 1
      selectPolicy: Max
      stabilizationWindowSeconds: 0
    scaleUp:
      policies:
      - periodSeconds: 60
        type: Percent
        value: 900
      selectPolicy: Max
      stabilizationWindowSeconds: 0
  maxReplicas: 7
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 50
        type: Utilization
    type: Resource
  minReplicas: 1
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: php-apache
EOF
```

## Configure Minimum and Maximum CPU Constraints for a Namespace
Ref.: [https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/cpu-constraint-namespace/](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/cpu-constraint-namespace/)

Units are in two formats:
```
1000m == 1 CPU
1.5 == 1.5 CPU
```

Limits and requets:
```
limits:
  cpu: 500m <- Max limit for startup etc.
requests:
  cpu: 200m <- Expected usage
```

```
apiVersion: v1
kind: LimitRange
metadata:
  name: cpu-min-max-demo-lr
spec:
  limits:
  - max:
      cpu: "800m"
    min:
      cpu: "200m"
    type: Container
```

## DNS tools
```
kubectl get services -o json | grep kubernetes.fqdn
kubectl -n kube-system get svc kube-dns
kubectl -n namespace get ep
```

## Rules
__periodSeconds__ The first policy (Pods) allows at most 4 replicas to be scaled down in one minute. The second policy (Percent) allows at most 10% of the current replicas to be scaled down in one minute.
```
behavior:
  scaleDown:
    policies:
    - type: Pods
      value: 4
      periodSeconds: 60
    - type: Percent
      value: 10
      periodSeconds: 60
```

_Pods are removed by the HPA to 10% per minute OR no more than 5 Pods are removed per minute._ __selectPolicy__ Min means that the autoscaler chooses the policy that affects the smallest number of Pods.
```
behavior:
  scaleDown:
    policies:
    - type: Percent
      value: 10
      periodSeconds: 60
    - type: Pods
      value: 5
      periodSeconds: 60
    selectPolicy: Min
```

