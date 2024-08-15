# expose
Create a deployment with a service and a pod, and then expose the pod on the node
```
kubectl create deployment nginx-skobba --image=nginx --port=80

kubectl expose pod nginx-skobba-xxxxxxx --type NodePort --port 80
```
