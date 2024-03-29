# zfs
## ZFS File System Hierarchy
[Creating a ZFS File System Hierarchy](https://docs.oracle.com/cd/E23823_01/html/819-5461/gaypa.html)

*After creating a storage pool to store your data, you can create your file system hierarchy. Hierarchies are simple yet powerful mechanisms for organizing information. They are also very familiar to anyone who has used a file system. ZFS allows file systems to be organized into hierarchies, where each file system has only a single parent. The root of the hierarchy is always the pool name. ZFS leverages this hierarchy by supporting property inheritance so that common properties can be set quickly and easily on entire trees of file systems.*

## Diskutils
__Delelete file systems and rebuild partiontable__
```
wipefs -a /dev/sdc
```

__List disks__
```
lsblk

ls -lh /dev/disk/by-path/
```

## Pools

__Create raid 10 pool__

*Creating a RAID1 pool of two drives, and then adding another pair of mirroring drives creates a RAID 10 pool where data is striped over two mirrors.*

```
zpool create myRaid10Pool \
  mirror disk1 disk2 \
  mirror disk3 disk4

zpool status 

pool: myRaid10Pool
 state: ONLINE
  scan: none requested
config:

        NAME        STATE     READ WRITE CKSUM
        myPool      ONLINE       0     0     0
          mirror-0  ONLINE       0     0     0
            sdb     ONLINE       0     0     0
            sdc     ONLINE       0     0     0
          mirror-1  ONLINE       0     0     0
            sdd     ONLINE       0     0     0
            sde     ONLINE       0     0     0

```

__Create a raid2 pool__
```
zpool create tank raidz2 sdc sdd sde sdf
```

__ZFS pool is no longer using the disk__
```
zpool export tank
```

## Dataset
__Create a container for individual file systems__
```
zfs create tank/kubernetes
```

__Set the inherited properties__
_After the file system hierarchy is established, set up any properties to be shared among all user_

```
# Allready mounted: zfs set mountpoint=/tank/kubernetes tank/kubernetes
zfs set sharenfs=on tank/kubernetes
zfs set compression=on tank/kubernetes
zfs get compression tank/kubernetes
```

__List datasets__
```
zfs list

zfs list -o name
```

__Mount dataset__
```
zfs set mountpoint=/mnt/data tank/data
```

__Unmount dataset__
```
zfs unmount tank

# Stop any ZFS services
systemctl stop zfs-import-cache
systemctl stop zfs-mount
```

__Destroy dataset recursive__
```
zfs destroy
zfs list -o name | grep my | xargs -n1 zfs destroy -r
```

## Snapshots
__List snapshots for a pool__
```
zfs list  -t snapshot -r rpool
```

## History
```
zpool history -i
```

## zdb
Check the name
```
zdb -l /dev/sdb

# Result
failed to unpack label 0
failed to unpack label 1
------------------------------------
LABEL 2
------------------------------------
    version: 5000
    name: 'rpool'
    state: 0
    txg: 4
    pool_guid: 7567958798130254195
    errata: 0
    hostid: 459579541
    hostname: 'ubuntu-server'
    top_guid: 14396637372501169223
    guid: 14396637372501169223
    vdev_children: 1
    vdev_tree:
        type: 'disk'
        id: 0
        guid: 14396637372501169223
        path: '/dev/disk/by-id/scsi-SATA_INTEL_SSDSC2KB24_BTYS820606UV240AGN-part4'
        whole_disk: 0
        metaslab_array: 131
        metaslab_shift: 31
        ashift: 12
        asize: 236842909696
        is_log: 0
        create_txg: 4
    features_for_read:
        com.delphix:hole_birth
        com.delphix:embedded_data
    labels = 2 3
```

## Encryption
[https://arstechnica.com/gadgets/2021/06/a-quick-start-guide-to-openzfs-native-encryption/](https://arstechnica.com/gadgets/2021/06/a-quick-start-guide-to-openzfs-native-encryption/)

## Raid types
* raid0 (striping)
    - no redundancy and best performance

* raid1 (mirroring)
    - excellent redundancy as you can lose every drive except one

* :warning: raid 2, raid 3 and raid 4
    - No longer used by the IT industry. Raid2 uses an equal amount of disks as dedicated
    ECC drives. Raid 3 and 4 use a single dedicated parity drive. None of these raids are
    used in production anymore due to horrible random read and write performance.

* raid5 or raidz
    - Distributes parity along with the data and can lose one physical drive before a
    raid failure. Because parity needs to be calculated raid 5 is slower then raid0,
    but raid 5 is much safer. RAID 5 requires at least three hard disks in which one(1)
    full disk of space is used for parity.

* raid6 or raidz2
    - Distributes parity along with the data and can lose two physical drives instead of
    just one like raid 5. Because more parity needs to be calculated raid 6 is slower then
    raid5, but raid6 is safer. raidz2 requires at least four disks and will use two(2) disks of space for parity.

* raid7 or raidz3
    - Distributes parity just like raid 5 and 6, but raid7 can lose three physical drives.
    Since triple parity needs to be calculated raid 7 is slower then raid5 and raid 6,
    but raid 7 is the safest of the three. raidz3 requires at least four,
    but should be used with no less then five(5) disks, of which three(3) disks of space
    are used for parity.

* raid10 or raid1+0 
    - Mirroring and striping of data. The simplest raid10 array has four disks and consists
    of two pairs of mirrors. Disk 1 and 2 are mirrors and separately disk 3 and 4 are 
    another mirror. Data is then striped (think raid0) across both mirrors.
    You can lose one drive in each mirror and the data is still safe.
    You can not lose both drives which make up one mirror,
    for example drives 1 and 2 can not be lost at the same time.
    Raid 10 's advantage is reading data is fast.
    The disadvantages are the writes are slow (multiple mirrors) and capacity is low.

* raid60 or raid6+0
    - Stripe of two or more raid6 volumes. You get the advantage of raid6 safety (lose two drives per raid6 array) and
    of raid0 striping read speeds. The negatives are the same as raid10.

* raid70 or raid7+0
    - Stripe of two or more raid7 volumes. Just like raid6, you take advantage of
    raid7 safety and raid0 striping read speeds, but lose capacity.
