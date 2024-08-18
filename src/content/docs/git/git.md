---
title: git
---

# git

## interactive
Remove untracked files

    git clean -i

Remove tracked files

    git reset --hard

## User contribution statistics
```
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

## Orphant Branch
```
cd repository
git checkout --orphan orphan_name
git rm -rf .
rm '.gitignore'
echo "#Orphan Braqnch" > README.md
git add README.md
git commit -a -m "Initial Commit"
git push origin orphan_name
```

