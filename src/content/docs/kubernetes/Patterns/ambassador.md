# Ambassador

## Sample
Pod with both frontend and logging containers. The logging container will act as a proxy or logging service, while the frontend container will serve the application.

### Create Multi-container Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: frontend-logging-pod
  labels:
    app: frontend-logging
spec:
  containers:
  - name: frontend
    image: your-frontend-image:latest
    ports:
    - containerPort: 80
    env:
    - name: BACKEND_SERVICE_URL
      value: "http://localhost:8080" # Point to the logging container in the same Pod
  - name: logging
    image: nginx:latest
    ports:
    - containerPort: 8080
    volumeMounts:
    - name: log-volume
      mountPath: /var/log/nginx
  volumes:
  - name: log-volume
    emptyDir: {}
```

### Create Frontend Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: frontend-logging
```
