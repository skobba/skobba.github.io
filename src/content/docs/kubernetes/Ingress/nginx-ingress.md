# nginx-ingress

## nginx verison

* github.com/nginxinc/kubernetes-ingress
* [https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/](https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/)

Get
```
git clone https://github.com/nginxinc/kubernetes-ingress/
helm repo add nginx-stable https://helm.nginx.com/stable
helm repo update
```

Installing via Helm Repository
```
helm install my-release nginx-stable/nginx-ingress --skip-crds
```

```
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```
  
Upgrade via Helm Repository:
```
helm upgrade my-release nginx-stable/nginx-ingress
```

## kubernetes.github.io (nginx-ingress)
* [https://kubernetes.github.io/ingress-nginx/deploy/](https://kubernetes.github.io/ingress-nginx/deploy/)

Install
```
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

Check
```
kubectl get pods --namespace=ingress-nginx
```

Let's create a simple web server and the associated service:
```
kubectl create deployment demo --image=httpd --port=80
kubectl expose deployment demo
```

Then create an ingress resource. The following example uses an host that maps to localhost:

```
kubectl create ingress demo-localhost --class=nginx \
    --rule=demo.localdev.me/*=demo:80
````

Now, forward a local port to the ingress controller:
```
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
```

For baremetal
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/baremetal/deploy.yaml
```

For more information about bare metal deployments (and how to use port 80 instead of a random port in the 30000-32767 range), see [bare-metal considerations](https://kubernetes.github.io/ingress-nginx/deploy/baremetal/).

Test
```
NAMESPACE       NAME                                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
default         service/demo                                 ClusterIP   10.110.15.207   <none>        80/TCP                       64m
default         service/kubernetes                           ClusterIP   10.96.0.1       <none>        443/TCP                      77m
ingress-nginx   service/ingress-nginx-controller             NodePort    10.105.28.129   <none>        80:30556/TCP,443:30637/TCP   69m
ingress-nginx   service/ingress-nginx-controller-admission   ClusterIP   10.105.137.16   <none>        443/TCP                      69m
kube-system     service/kube-dns                             ClusterIP   10.96.0.10      <none>        53/UDP,53/TCP,9153/TCP       77m
```

```
curl demo.localdev.me:30556

Outputs:

<html><body><h1>It works!</h1></body></html>
```


## Install with Manifests
* [https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-manifests/](https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-manifests/)
