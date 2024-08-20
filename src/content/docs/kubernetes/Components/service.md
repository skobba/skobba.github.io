# Service

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
