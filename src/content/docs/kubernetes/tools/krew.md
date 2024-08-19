# Krew
_Package manager for kubectl plugins. It allows you to easily discover, install, and manage kubectl plugins, which are additional commands or features that extend the functionality of kubectl._

__Install krew in zsh__
```
(
  set -x; cd "$(mktemp -d)" &&
  OS="$(uname | tr '[:upper:]' '[:lower:]')" &&
  ARCH="$(uname -m | sed -e 's/x86_64/amd64/' -e 's/\(arm\)\(64\)\?.*/\1\2/' -e 's/aarch64$/arm64/')" &&
  KREW="krew-${OS}_${ARCH}" &&
  curl -fsSLO "https://github.com/kubernetes-sigs/krew/releases/latest/download/${KREW}.tar.gz" &&
  tar zxvf "${KREW}.tar.gz" &&
  ./"${KREW}" install krew
)
```

Add the $HOME/.krew/bin directory to your PATH environment variable. To do this, update your .bashrc or .zshrc file and append the following line:
```
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"
```

__Install tail__
```
kubectl krew install tail
kubectl tail -h
```
