# Ingress

## Providers
* [List of providers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)
* [Nginx Ingress Versions Table](https://gist.github.com/grigorkh/f8e4fd73e99f0fde06a51e2ed7c2156c)


## ingress-nginx or nginx-ingress
* __Community version__ – Found in the kubernetes/ingress-nginx repo on GitHub, the community Ingress controller is based on NGINX Open Source with docs on Kubernetes.io. It is maintained by the Kubernetes community with a commitment from F5 NGINX to help manage the project
* __NGINX version__ – Found in the nginxinc/kubernetes-ingress repo on GitHub, NGINX Ingress Controller is developed and maintained by F5 NGINX with docs on docs.nginx.com. It is available in two editions:
    * NGINX Open Source‑based (free and open source option)
    * NGINX Plus-based (commercial option)

## Overview
An ingress controller is an Kubernetes resource that routes traffics from outside the cluster to whithin the cluster.

* Ingress traffic – Traffic entering a Kubernetes cluster
* Egress traffic – Traffic exiting a Kubernetes cluster
* North‑south traffic – Traffic entering and exiting a Kubernetes cluster (also called ingress‑egress traffic)
* East‑west traffic – Traffic moving among services within a Kubernetes cluster (also called service-to-service traffic)
* Service mesh – A traffic management tool for routing and securing service-to-service traffic

```
                   Internet
                      │
             ┌────────▼────────┐
             │  Load Balancer  │
             └────────┬────────┘
                      │
┌─────────────────────┼───────────────────┐
│ Kubernetes Cluster  │                   │
│            ┌────────▼────────┐          │
│            │    Ingress      │          │
│            │    Controller   │          │
│            └───────┬─────────┘          │
│            ┌───────▼─────────┐          │
│            │    Ingress      │          │
│            │    Rules        │          │
│            └──┬─────────┬────┘          │
│    ┌──────────▼───┐ ┌───▼────────┐      │
│    │ Node1        │ │ Node2      │      │
│    │              │ │            │      │
│    │ ClusterIP    │ │ ClusterIP  │      │
│    │   Pod1       │ │    Pod2    │      │
│    └──────────────┘ └────────────┘      │
└─────────────────────────────────────────┘
```
