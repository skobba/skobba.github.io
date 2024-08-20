# Namespaces

## Filter all ns on name

Using custom-columns:
```sh
kubectl get ns -A -o custom-columns="NAMESPACE:.metadata.name" --no-headers
```

Using jsonpath:
```sh
kubectl get ns -A -o jsonpath="{.items[*].metadata.name}"
```

