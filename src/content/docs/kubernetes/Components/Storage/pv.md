# PV

## Finalizer
Ref.: [https://www.linkedin.com/pulse/why-pv-persistent-volume-pvc-claim-get-stuck-state-due-nguyen-duc/](https://www.linkedin.com/pulse/why-pv-persistent-volume-pvc-claim-get-stuck-state-due-nguyen-duc/)

![k8-pv-finalizer.png](k8-pv-finalizer.png)

Even though the PV appears in __Terminating__ status, its actual status is still __Bound__, the finalizer relies on deletionTimestamp and deletionGracePeriodSeconds fields inside metadata to fulfill its purpose.


View terminating status:
```sh
kubectl get pv
```

To remove a finalizer from a PVC, use the following command as an example:
```sh
kubectl patch pvc pv-claim-name -p '{"metadata":{"finalizers":null}}'
```
