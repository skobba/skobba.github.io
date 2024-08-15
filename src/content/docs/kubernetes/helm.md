# Helm
_Helm allows you to create and use charts in your Kubernetes clusters. A Helm chart is a layer on top of your resources that logically combines them, and allows you to treat them as a single entity for their lifecycle._

_An example: If you have an application that is comprised of 2 deployments, a namespace, a service account, and service. Without Helm you are creating and updating these items separately and individually. Helm allows you to group these into a chart as a single unit. Another benefit of Helm is the ability to parameterize certain aspects of this “application” (the manifests) so that you can specify different values from different requirements._

_A chart can be either an 'application' or a 'library' chart._

__Application__ charts are a collection of templates that can be packaged into versioned archives to be deployed.

__Library__ charts provide useful utilities or functions for the chart developer. They're included as a dependency of application charts to inject those utilities and functions into the rendering pipeline. Library charts do not define any templates and therefore cannot be deployed.

__Structure__
```
foo/
├── .helmignore   # Contains patterns to ignore when packaging Helm charts.
├── Chart.yaml    # Information about your chart
├── values.yaml   # The default values for your templates
├── charts/       # Charts that this chart depends on
└── templates/    # The template files
    └── tests/    # The test files
```

## Install
osx:
```
brew install helm
```

apt:
```
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | tee /usr/share/keyrings/helm.gpg > /dev/null
apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | tee /etc/apt/sources.list.d/helm-stable-debian.list
apt-get update
apt-get install helm
```

Jenkins Chart:
```
helm repo add jenkins https://charts.jenkins.io

helm search repo jenkins
```

## Repo
```
helm repo add bitnami https://charts.bitnami.com/bitnami

helm search repo bitnami/word

helm show readme bitnami/wordpress
```

## Use
```
helm list --all-namespaces

helm get manifest redis-stack-server -n redis
```

## Render chart with template
__helm template__ is a command-line tool provided by Helm, the Kubernetes package manager. It allows you to render Helm charts locally without installing them onto a Kubernetes cluster. This command generates Kubernetes YAML manifests based on the values provided in the chart's __values.yaml__ file and any overrides you specify.
```
helm template mymysql bitnami/mysql
```

## Values file
```
helm get values myrelease

helm show values oci://registry-1.docker.io/bitnamicharts/keycloak
```

## Upgrade
Latest version will be specified unless the '--version' flag is set.
 
### values
```
helm upgrade dashboard kubernetes-dashboard/kubernetes-dashboard --set="service.externalPort=8080,resources.limits.cpu=200m,metricsScraper.enabled=true"
```
### reuse-values
```sh
helm upgrade --reuse-values bitnami/nginx mydeployname --version=18.1.0
```

## CRD
Command to view the CRDs associated with the ArgoCD Helm chart. This can be useful for understanding the resources that ArgoCD will manage within your Kubernetes cluster.
```
helm show crds <chart>
```

