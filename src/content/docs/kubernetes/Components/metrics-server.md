# Metrics Server

## Install
For kind:
```
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Add insecure TLS parameter to the components.yaml file:
```
metadata:
      labels:
        k8s-app: metrics-server
    spec:
      containers:
      - args:
        - --cert-dir=/tmp
        - --secure-port=4443
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --kubelet-use-node-status-port
        - --kubelet-insecure-tls   <=========================================== Add this
        - --metric-resolution=15s
        image: k8s.gcr.io/metrics-server/metrics-server:v0.6.2
        imagePullPolicy: IfNotPresent
        livenessProbe:
          failureThreshold: 3
          httpGet:
            path: /livez
...
```

Apply:
```
kubectl apply -f components.yaml
```

## Intall with Helm (artifacthub.io)
```
helm upgrade --install metrics-server metrics-server/metrics-server -n metrics-server \
    --create-namespace --namespace metrics-server \
    --set args="{--kubelet-preferred-address-types=InternalIP}" \
    --set args="{--kubelet-insecure-tls=true}"
```

## Intall with Helm (Bitnani) NOT WORKING!
```
helm repo add bitnami https://charts.bitnami.com/bitnami

helm search repo metrics-server

helm upgrade --install metrics-server bitnami/metrics-server \
--create-namespace --namespace metrics-server \
--set apiService.create=true \
--set --extraArgs.kubelet-insecure-tls=true \
--set --extraArgs.kubelet-preferred-address-types=InternalIP
```

## The problem with TLS
Ref.
* [https://syself.com/blog/secure-metrics-server](https://syself.com/blog/secure-metrics-server)
* [https://particule.io/en/blog/kubeadm-metrics-server/](https://particule.io/en/blog/kubeadm-metrics-server/)
* [Certificates and Certificate Signing Requests](https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/)

metrics-server tries to reach the Kubelet API but the TLS connection fails because node’s IP is not part of the certificate SAN.

Metrics-server uses the http endpoint of the kubelets. Kubeadm used the default way, the certificate which is used for TLS is self-signed.
Therefore, metrics-server cannot validate it and throws an error. To be able to run metrics-server at all, the kubelet-insecure-tls flag needs to be set to true.

Apparently, the origin of the problem is not the metrics-server, but the configuration of kubeadm and the kubelets. A kubelet has two certificates and only the second is interesting for us:

* __kubelet-cert__: used for authentication of the kubelet with kube-apiserver
* __kubelet-serving-cert__: used as TLS certificate for its HTTP endpoint

In the following, we will find out how to create and approve actual Kubelet serving certificates.

The first step is quite easy and is explained in the [Kubernetes docs](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/#kubelet-serving-certs). We can set the following in the cluster configuration:

```
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
serverTLSBootstrap: true
```

## Query metrics-server
```
kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes
```

## Troubleshoot 
```
kubectl get apiservices
```
