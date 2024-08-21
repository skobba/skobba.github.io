# Side car

## Sample

Create Pod:
```sh
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx-busybox-pod
  labels:
    app: nginx-busybox
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
    volumeMounts:
    - name: shared-logs
      mountPath: /usr/share/nginx/html/logs
    command: ["/bin/sh", "-c", "mkdir -p /usr/share/nginx/html/logs && nginx -g 'daemon off;'"]
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'while true; do cp /usr/share/nginx/html/logs/* /logs/; sleep 5; done']
    volumeMounts:
    - name: shared-logs
      mountPath: /usr/share/nginx/html/logs
    - name: logs-storage
      mountPath: /logs
  volumes:
  - name: shared-logs
    emptyDir: {}
  - name: logs-storage
    emptyDir: {}
EOF
```

Create Service:
```sh
kubectl expose pod nginx-busybox-pod --port=80 --target-port=80 --type=NodePort --name=nginx-busybox-service

kubectl patch service nginx-busybox-service -p '{"spec": {"ports": [{"port": 80, "targetPort": 80, "nodePort": 30080}]}}'

# Get the ip
kubectl get pod nginx-busybox-pod -o jsonpath='{.status.hostIP}'

# Test
http://192.168.1.14:30080

```
