# MinIO
* https://github.com/minio/operator/tree/master/helm/minio-operator

*MinIO is API compatible with Amazon’s S3 cloud storage service. Use MinIO to build high performance infrastructure for machine learning, analytics and application data workloads.*

# Install
```
helm repo add minio https://operator.min.io/
```
Deploys MinIO Operator on the Kubernetes cluster in the default configuration.
```
helm install --namespace minio-operator --create-namespace --generate-name minio/minio-operator
```

Creating a Tenant
```
kubectl apply -f https://raw.githubusercontent.com/minio/operator/master/examples/kustomization/tenant-lite/tenant.yaml
```

This creates a 4 Node MinIO Tenant (cluster). To change the default values, take a look at various examples.

