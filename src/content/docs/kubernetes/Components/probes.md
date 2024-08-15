# Probes
Liveness, Readiness and Startup Probes

Methods available:
* HTTP Request: Perform an HTTP GET request.
* TCP Socket: Attempt to open a TCP connection.
* Exec Command: Execute a command inside the container.

## Create readinessProbe on Pod with cat

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: readyness
  name: pod6
spec:
  containers:
  - name: readynesscontainer
    image: busybox:1.31.0
    args:
    - /bin/sh
    - -c
    - touch /tmp/ready && sleep 1d
    readinessProbe:
      exec:
        command:
        - cat
        - /tmp/ready
      initialDelaySeconds: 5
      periodSeconds: 10
```

## Create readinessProbe on Deployment with stat
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: welcome-message-generator
  name: welcome-message-generator
spec:
  replicas: 1
  selector:
    matchLabels:
      app: welcome-message-generator
  strategy: {}
  
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: welcome-message-generator
    spec:
      containers:
      - image: httpd:alpine
        name: httpd
        ports:
        - containerPort: 80
        resources: {}
        readinessProbe:
          exec:
            command:
            - stat
            - /tmp/ready
          initialDelaySeconds: 5
          periodSeconds: 5
```

## livenessProbe and readinessProbe with http
Pod with livenessProbe and readinessProbe:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: example-container
    image: my-app:1.0
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 3
      periodSeconds: 3
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 3
```
