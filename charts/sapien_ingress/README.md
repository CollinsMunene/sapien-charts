# Sapien Africa Ingress Controller
Sapien Africa Ingress Controller is an extention of the Sapien Africa API Gateway  mainly for Kubernetes implementations

## What is this?

This is an [ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) for [Kubernetes](https://kubernetes.io/).

Ingress controllers provide access to services running within a Kubernetes cluster, to clients outside the cluster. They can provide features such as SSL termination, authentication, and more. You can think of an ingress controller as the "front door" to your cluster.

This ingress controller is still in it's early stages and more custom functionalities will be added. However, if you need to add custom functionality to the ingress controller, you will need to reach out to [contact@sapienafrica.com](https://sapienafrica.com)

## Why another ingress controller?

Currently, the most commonly used ingress controller is [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/). This works well for many people, and _**Sapien Africa Ingress Controller**_ does not seek to replace it.

Instead, our goals are as follows:

* **African Born Ingress:** An ingress controller is an important part of the security of your Kubernetes cluster. We think it's important with all the GDPR issue, to have a gateway that is local and that offers immediate assistance.

* **Access to the ecosystem:** Extensions for other controllers are difficult to get a hold off and so if you need to write an extension to add custom functionality, there's a good chance we are already working on it, and with constant support you can reach out and we add it immediately.

* **Best practices by default:** There are some things you'd rather not have to think about. _**Sapien Africa Ingress Controller**_ aims to handle these things for you, out-of-the-box or with minimal setup required.

## Quick start

In most cases, the setup process should be very similar to that of other ingress controllers such as NGINX Ingress Controller. You can even use the two ingress controllers side-by-side if you want (just remember to put the appropriate `kubernetes.io/ingress.class` annotation on each `Ingress` to indicate which one you want to use).

The following guide is intended for people who have never set up an ingress controller before. If you already know what you're doing, feel free to do it a different way.

### Prerequisites

The only strict prerequisite is that you have **a Kubernetes cluster** of some sort. However, there are a few other things that you'll probably want to set up, assuming you want your `Ingress`es to be accessible from the public internet.

*[production] Your Kubernetes cluster needs to be able to allocate a **public IP address** to the ingress controller's [LoadBalancer Service](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer). Most managed cloud Kubernetes providers will do this for you automatically when you deploy _**Node.js Ingress Controller**_ to your cluster.
* [developemnt] If you are using minikube locally, you will need to open a new terminal and run `minikube tunnel`, this will open a direct tunnel to the load balancer giving it a localahost ip address.
* [production] You'll want one or more **domain names** to point at your ingresses. You can either set these up manually (once you have your public IP address) or use something like [external-dns](https://github.com/kubernetes-sigs/external-dns) to do it automatically. If you're planning on having just one (or a few) registered domains, and a lot of subdomains under them for your various services, you may find it helpful to set up a DNS zone with your cloud provider and then configure external-dns to manage that zone automatically for you.
* [development] Using minkube locally, you can setup your host domain under the `/etc/hosts/` file in such a manner `127.0.0.1 testdomain.local`
* [production] Assuming you're using HTTPS (which you almost always should), you'll need certificates for your hostnames. We recommend installing [cert-manager](https://cert-manager.io/) on your cluster, and [configuring it to use Let's Encrypt](https://cert-manager.io/docs/configuration/acme/).

### Configuring your ingresses

Each `Ingress` that you want to expose via _**Sapien Africa Ingress Controller**_ must have the following annotation:

    kubernetes.io/ingress.class: sapienafrica

If you're using cert-manager and Let's Encrypt, you'll also want the following annotations. (Assuming your `Issuer` is called `letsencrypt` as per the [guide](https://cert-manager.io/docs/configuration/acme/).)

    cert-manager.io/cluster-issuer: letsencrypt
    cert-manager.io/acme-challenge-type: http01

You should also have the following section in the `spec` of your `Ingress` (replace `HOSTNAME_GOES_HERE` with the hostname, and `SECRET_NAME_FOR_TLS_CERT` with a unique name for the `Secret` that the TLS certificate will be stored in).

    tls:
      - hosts:
          - HOSTNAME_GOES_HERE
        secretName: SECRET_NAME_FOR_TLS_CERT

### Install Sapien Africa Controller and Deploy your ingress resources

_**Sapien Africa Ingress Controller**_ is provided as a [Helm](https://helm.sh/) chart. You can install it as follows:
* Run the commands below to install sapien controller:
      
        # add the repo
        helm repo add sapien-charts https://collinsmunene.github.io/sapien-charts/
        helm repo update

        # install the charts
        helm upgrade --install sapien-ingress sapien-charts/sapien-ingress
      
        # to update
        helm repo update
        helm upgrade --install sapien-ingress sapien-charts/sapien-ingress

      
* Run the commands below to deploy a simple app and an ingress resource:

      git clone https://github.com/CollinsMunene/sapien-charts.git
      cd example
      kubectl apply -f simple-web-app.yaml -n sapien-ingress
      kubectl apply -f ingress.yaml -n sapien-ingress
      
 And that's it, you should have your ingress rules redirecting traffic as you have set them
