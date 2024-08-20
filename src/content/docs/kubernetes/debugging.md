# Debugging

## Terminal Tools
* kail
* kubetail

## Events
```
kubectl events -A
```

## Throw away container to run a command
```sh
# Check if ping is working
kubectl run -i --tty --rm pingtest --image=busybox --restart=Never -- /bin/sh -c "ping ipinfo.no"

# Check the service
kubectl run -i --tty --rm pingtest --image=busybox --restart=Never -- /bin/sh -c "ping http://pod1.myns:3333"
```


## netshoot
*a Docker + Kubernetes network trouble-shooting swiss-army container*

* [https://github.com/nicolaka/netshoot](https://github.com/nicolaka/netshoot)

Throw away container for debugging
```sh
kubectl run tmp-shell --rm -i --tty --image nicolaka/netshoot -- /bin/bash
```

On host network
```sh
kubectl run tmp-shell --rm -i --tty --overrides='{"spec": {"hostNetwork": true}}' --image nicolaka/netshoot -- /bin/bash
```
