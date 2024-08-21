# Service

## NodePort and ports above 30000
With a Service of type NodePort, Kubernetes exposes it on a static port on each node in the cluster. By default, Kubernetes assigns ports from the 30000–32767 range to these services. This allows external traffic to access the service by connecting to any node's IP address on one of these ports.

Note: Ports above 49152 are dynamic or private ports, which are typically used for ephemeral or temporary connections. The 30000–32767 range falls in between these two ranges, providing a buffer to avoid conflicts.

## Create a service for a pod
```sh
# Create pod
kubectl run pod1 -n myns --image=httpd:2.4.41-alpine --labels="app=myapp"

# Create service on port 3333
kubectl expose pod pod1 --port=80 --target-port=3333 --name=pod1-service
```

## Test a service
### Running a command
```sh
# Check if ping is working
kubectl run -i --tty --rm pingtest --image=busybox --restart=Never -- /bin/sh -c "ping ipinfo.no"

# Check the service
kubectl run -i --tty --rm pingtest --image=busybox --restart=Never -- /bin/sh -c "ping http://pod1.myns:3333"
```

###  Enter container
```sh
kubectl run tmp-shell --rm -i --tty --image nginx:alpine -- /bin/bash
```

## Check the logs
```sh
kubectl logs -n myns pod1
```
