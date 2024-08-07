# Debian Live

Choose an image (such as the netinst, CD or DVD-1) that will fit on your USB stick from [https://www.debian.org/CD/http-ftp/#stable](https://www.debian.org/CD/http-ftp/#stable).

Check Filesystem:
```
df -h /Volumes/KINGSTON

Filesystem     Size   Used  Avail Capacity iused ifree %iused  Mounted on
/dev/disk4s1   58Gi  2.8Mi   58Gi     1%       0     0  100%   /Volumes/KINGSTON
```

Unmount disk:
```
sudo diskutil unmount /dev/disk4s1
```

Copy ISO:
```
sudo cp debian-live-12.4.0-amd64-cinnamon.iso /dev/disk4
sudo cp debian-live-12.4.0-amd64-cinnamon.iso /dev/disk4s1


```

## Enable Persistence
Ref.: [https://live-team.pages.debian.net/live-manual/html/live-manual/customizing-run-time-behaviours.en.html#556](https://live-team.pages.debian.net/live-manual/html/live-manual/customizing-run-time-behaviours.en.html#556)

A persistence volume is any of the following:
* a partition, identified by its GPT name.
* a filesystem, identified by its filesystem label.
* an image file located on the root of any readable filesystem (even an NTFS partition of a foreign OS), identified by its filename.



ext4 setup:
```
mkfs.ext4 -L persistence /dev/sdb1
```

Install Live Build (lb)
```
apt-get install live-build
```

