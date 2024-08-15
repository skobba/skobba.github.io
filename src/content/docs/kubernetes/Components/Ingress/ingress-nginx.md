# ingress-nginx
Ref.:
* [Docs - deploy](https://kubernetes.github.io/ingress-nginx/deploy/)

## Basic Ingress (two paths)
```sh
kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: world
  namespace: world
  annotations:
    # this annotation removes the need for a trailing slash when calling urls
    # but it is not necessary for solving this scenario
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: world.universe.mine
    http:
      paths:
      - path: /asia
        pathType: Prefix
        backend:
          service:
            name: asia
            port:
              number: 80
      - path: /europe
        pathType: Prefix
        backend:
          service:
            name: europe
            port:
              number: 80
EOF
```

## Generate TSL
https://kubernetes.github.io/ingress-nginx/examples/PREREQUISITES/#test-http-service

```sh
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=nginxsvc/O=nginxsvc"

kubectl create secret tls tls-secret --key tls.key --cert tls.crt
```

## Check version
```sh
# Run /nginx-ingress-controller --version within the pod, for instance with kubectl exec:

POD_NAMESPACE=ingress-nginx
POD_NAME=$(kubectl get pods -n $POD_NAMESPACE -l app.kubernetes.io/name=ingress-nginx --field-selector=status.phase=Running -o name)
kubectl exec $POD_NAME -n $POD_NAMESPACE -- /nginx-ingress-controller --version

```
