# kubie
Ref.: [https://blog.sbstp.ca/introducing-kubie/](https://blog.sbstp.ca/introducing-kubie/)

* _Using the kubie ctx command, you can set your context, while kubie ns allows you to set your namespace._
* _Unlike Kubectx and Kubens, which change global config files, Kubie isolates shells from each other, never altering the global config files._

## Install
Linux
```
wget https://github.com/sbstp/kubie/releases/download/v0.23.0/kubie-linux-amd64
mv kubie-linux-amd64 kubie
chmod +x kubie
```

Mac
```
brew tap kdash-rs/kdash
brew install kdash
```

## Usage
```
kubie ctx
kubie ns
```

## zsh
Add kubectl to the list of plugins in ~/.zshrc
```
...
plugins=(
  ...
  kubectl
  ...
)
```
