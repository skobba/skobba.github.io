# argocd
Ref.: [Your complete guide to declarative installation and management with the App of Apps approach ](https://www.cncf.io/blog/2024/03/07/unlocking-argocd-your-complete-guide-to-declarative-installation-and-management-with-the-app-of-apps-approach/)

## Running Argo CD locally
### Install argocd on Mac
```
brew install argocd
```

### Deploy Argo CD
```
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

or
git clone https://github.com/argoproj/argo-cd
cd argo-cd
kubectl create namespace argocd
kubectl apply -n argocd --force -f manifests/install.yaml
```

### Scale down any Argo CD instance in your cluster
Make sure that Argo CD is not running in your development cluster by scaling down the deployments.

```
kubectl -n argocd scale statefulset/argocd-application-controller --replicas 0
kubectl -n argocd scale deployment/argocd-dex-server --replicas 0
kubectl -n argocd scale deployment/argocd-repo-server --replicas 0
kubectl -n argocd scale deployment/argocd-server --replicas 0
kubectl -n argocd scale deployment/argocd-redis --replicas 0
kubectl -n argocd scale deployment/argocd-applicationset-controller --replicas 0
kubectl -n argocd scale deployment/argocd-notifications-controller --replicas 0
```

### Start local services (virtualized toolchain inside Docker)
NB: Did not work!

The started services assume you are running in the namespace where Argo CD is installed.

You can set the current context default namespace as follows:
```
kubectl config set-context --current --namespace=argocd
```

When you use the virtualized toolchain, starting local services is as simple as running:
```
make start
```

### Start local services (running on local machine)
```
brew install goreman

export KUBECONFIG=~/.kube/config-kind
make start-local
```

### Service creates 
```
The Argo CD API server on port 8080
The Argo CD UI server on port 4000
The Helm registry server on port 5000


14:20:56                     redis | Starting redis on port 5300
14:20:56                git-server | Starting git-server on port 5700
14:20:56                       dex | Starting dex on port 5200
14:20:56               repo-server | Starting repo-server on port 5400
14:20:56             helm-registry | Starting helm-registry on port 5800
14:20:56 applicationset-controller | Starting applicationset-controller on port 6000
14:20:56              notification | Starting notification on port 6100
14:20:56                controller | Starting controller on port 5000
14:20:56                cmp-server | Starting cmp-server on port 5500
14:20:56                api-server | Starting api-server on port 5100
14:20:56                        ui | Starting ui on port 5600
14:20:56               dev-mounter | Starting dev-mounter on port 5900
```

### Create password
```
argocd admin initial-password -n argocd
```

### Access UI
* [http://localhost:4000/applications](http://localhost:4000/applications)

### Login with argocd
```
argocd login <ARGOCD_SERVER>

argocd login localhost:8080

Available Commands:
  account     Manage account settings
  admin       Contains a set of commands useful for Argo CD administrators and requires direct Kubernetes access
  app         Manage applications
  appset      Manage ApplicationSets
  cert        Manage repository certificates and SSH known hosts entries
  cluster     Manage cluster credentials
  completion  output shell completion code for the specified shell (bash or zsh)
  context     Switch between contexts
  gpg         Manage GPG keys used for signature verification
  help        Help about any command
  login       Log in to Argo CD
  logout      Log out from Argo CD
  proj        Manage projects
  relogin     Refresh an expired authenticate token
  repo        Manage repository connection parameters
  repocreds   Manage repository connection parameters
  version     Print version information
```
