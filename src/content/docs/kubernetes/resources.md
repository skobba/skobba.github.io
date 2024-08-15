# Resources

To view resource limits and requests for deployments:
```
kubectl get deployments --all-namespaces -o custom-columns=NAMESPACE:.metadata.namespace,NAME:.metadata.name,CPU_REQUEST:.spec.template.spec.containers[*].resources.requests.cpu,MEM_REQUEST:.spec.template.spec.containers[*].resources.requests.memory,CPU_LIMIT:.spec.template.spec.containers[*].resources.limits.cpu,MEM_LIMIT:.spec.template.spec.containers[*].resources.limits.memory
```
