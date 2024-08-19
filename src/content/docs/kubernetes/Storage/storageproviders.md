# Storage Providers
Ref.:
* [Forbs - Critical Capabilities For Container-Native Storage Running In Kubernetes Environment - Part 1](https://www.forbes.com/sites/janakirammsv/2020/07/26/critical-capabilities-for-container-native-storage-running-in-kubernetes-environmentpart-1/?sh=5d0b1904c1af)
* [OpenEBS - Using ZFS Volumes with Kubernetes](https://huttenga.net/blog/2020/03/using-zfs-volumes-with-kubernetes)
* [https://vadosware.io/post/k8s-storage-provider-benchmarks-round-2-part-5](https://vadosware.io/post/k8s-storage-provider-benchmarks-round-2-part-5/)

## Dynamic Volume Provisioning
*Dynamic volume provisioning allows storage volumes to be created on-demand. Without dynamic provisioning, cluster administrators have to manually make calls to their cloud or storage provider to create new storage volumes*

## OpenEBS
* [https://openebs.io](https://openebs.io)

```
 NAME: openebs
LAST DEPLOYED: Wed Oct 20 00:08:54 2021
NAMESPACE: openebs
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Successfully installed OpenEBS.

Check the status by running: kubectl get pods -n openebs

The default values will install NDM and enable OpenEBS hostpath and device
storage engines along with their default StorageClasses. Use `kubectl get sc`
to see the list of installed OpenEBS StorageClasses.

**Note**: If you are upgrading from the older helm chart that was using cStor
and Jiva (non-csi) volumes, you will have to run the following command to include
the older provisioners:

helm upgrade openebs openebs/openebs \
	--namespace openebs \
	--set legacy.enabled=true \
	--reuse-values

For other engines, you will need to perform a few more additional steps to
enable the engine, configure the engines (e.g. creating pools) and create
StorageClasses.

For example, cStor can be enabled using commands like:

helm upgrade openebs openebs/openebs \
	--namespace openebs \
	--set cstor.enabled=true \
	--reuse-values
```

