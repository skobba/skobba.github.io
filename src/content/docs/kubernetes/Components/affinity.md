# Affinity

## Hard/Soft
* __Hard affinity__ AKA "required node affinity", defined in the pod template under spec: ___affinity:nodeAffinity:requiredDuringSchedulingIgnoredDuringExecution___. This specifies conditions that a node must meet for a pod to schedule to it.
* __Soft affinity__ AKA "preferred known affinity", defined in the pod template under spec: ___affinity:nodeAffinity:preferredDuringSchedulingIgnoredDuringExecution___. This specifies conditions that a node should preferably meet, but if they are not present, it is still okay to schedule the pod (as long as hard affinity criteria are met).

## Node Selector vs. Node Affinity
* Both node selectors and node affinity can use Kubernetes labels—metadata assigned to a node. 
* Labels allow you to specify that a pod should schedule to one of a set of nodes, which is more flexible than manually attaching a pod to a specific node.
* The difference between node selector and node affinity can be summarized as follows:
** A node selector is defined via the nodeSelector field in the pod template. It contains a set of key-value pairs that specify labels. The Kubernetes scheduler checks if a node has these labels to determine if it is suitable for running the pod.
** Node affinity is an expressive language that uses soft and hard scheduling rules, together with logical operators, to enable more granular control over pod placement.


## Label nodes
```
kubectl label nodes <target-node-name> special-node=true
```

## Use in deployment
```
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
```

## Assigning pods
```yml
apiVersion: v1
kind: Pod
metadata:
  name: your-pod
  namespace: your-namespace
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: special-node
            operator: In
            values:
            - "true"
  containers:
  - name: your-container
    image: your-image

```
