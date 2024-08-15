# Remove nodes

__1. Drain the node:__
```
kubectl drain <node-name>
```
This command will gracefully evict all pods from the node.

__2. Cordon the node:__
```
kubectl cordon <node-name>
```
Marks the node as unschedulable, preventing new pods from being scheduled onto it.

__3. Verify all pods have been moved:__
```
kubectl get pods --all-namespaces -o wide
```
Ensure that no pods are running on the node you want to remove.

__4. Remove the node from the cluster:__
```
kubectl delete node <node-name>
```
