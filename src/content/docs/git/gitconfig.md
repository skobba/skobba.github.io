# .gitconfig

```js
[user]
    name=Gjermund Skobba
    email=gjermund@skobba.net
[push]
  default = simple
[pull]
  rebase = true
[color]
  ui = auto
[core]
  autocrlf = input
  editor = code --wait
  pager = less -F -X
[log]
  date = relative
[fetch]
  prune = true
[rebase]
  autosquash = true
[alias]
  git = !exec git
  lg = log --graph --decorate --pretty=format:'%C(yellow)%h%Creset - %C(green)%cr%Creset -%C(magenta)%d%Creset %s %C(blue)(%an)%Creset'
  lga = log --all --graph --decorate --pretty=format:'%C(yellow)%h%Creset - %C(green)%cr%Creset -%C(magenta)%d%Creset %s %C(blue)(%an)%Creset'
  sync = !git pr $1 && git push
  d = difftool
  co = checkout
  pf = push --force-with-lease
  pr = pull --rebase
  s = status
  a = add
  aa = add .
  cm = commit -m
  cma = commit -am
  amend = commit --amend --no-edit
  branch-name = "!git rev-parse --abbrev-ref HEAD"
  publish = "!git push -u origin $(git branch-name)"
  ```
  