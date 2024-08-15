# Job
## Create
```sh
k -n myns create job --help
k -n myns create job neb-new-job --image=busybox:1.31.0 --dry-run=client -oyaml > job.yaml -- sh -c "sleep 2 && echo done"
```

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: neb-new-job
  namespace: neptune
spec:
  parallelism: 2
  completions: 3
  template:
    metadata:
      labels:
        id: awesome-job
    spec:
      containers:
      - name: neb-new-job-container
        image: busybox:1.31.0
        command: ["sh", "-c", "sleep 2 && echo done"]
      restartPolicy: Never
```

## Rerun
1. Delete the existing Job and reapply it
2. Use a different Job name: If you don't want to delete the existing Job, you can modify the Job configuration to use a different name and then apply it.

