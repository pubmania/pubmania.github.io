---
title: "Home Networking"
slug: "home-networking"
authors: ['ankit']
date: 
      created: 2018-05-14T18:21:00
      updated: 2018-11-10T08:59:05
draft: false
description: Home Networking
comments: true
categories:
  - Linux
  - Network Setup
  - Server Setup
  - Router
---

## Network routing

1. **Router** - Router is the device at home that connects all devices in your house to the internet.
    
      1. It does so by assigning IP address to each of your device but this IP address is only relevant for devices connected to this router. What this means is that if you use an IP address allocated by this router from a coffee shop and you are not connected to your home router then you will not be able to reach the device that IP address belonged to. For this reason these IP addresses are called internal IP addresses. <!-- more -->
      2. Now what happens is when you try to access a website, your device sends the request to your router, router in turn sends it to the router of your ISP which in turn eventually connects to the server that is hosting the website. The information flows back through same route and your router finally gets the information and then passes it back to your device and it is able to do so because it identifies your device based on the Internal IP address it assigned to your device.
      3. By default pretty much all routers are configured to allocate these Internal IP Addresses using DHCP which is just fancy term for allocating a random number to the device. They do also provide the facility to reserve an IP address for a particular device if we tell it to do so - This is called "assigning a static IP on the router"; in technical speak. This is important when we are trying to host service from home based server and is explained next
      4. Many ISP provided routers are locked in and it will serve you well to get a router and flash it with an open source firmware like [DD-WRT](./2017-02-02-dd-wrt-firmware-on-tp-link-tl-wr841n-v11.md)

2. **Internal LAN set-up** - Ensure that on your internal LAN network you assign static IP address to device that will be running the server. If your router allows for LAN Domain to be configured then do so and allocate appropriate LAN Hostname as it makes it easier to access the server from within LAN than just by trying to remember the IP address.

3. **Port Forwarding** - When the request comes from Internet, it will be with http, ftp, smtp and those kind of headers. 
   
      * These headers operate on standard ports. However for security as well as application related issues, the ports on actual server within your home network can be significantly different. 
      * All this needs to be translated for communication to be completed and application to receive the information it requested.
      * Port Forwarding at router level is simply us telling router which IP address to pass on the received request based on the port that request is trying to access. 
      * For example http requests are on port 80 so if we want to tell the router that any requests coming on port 80 must be forwarded to a laptop in your house with internal ip address of 192.168.1.44, then port forwarding should be the way to do so.


## Internet to Home

Use of Dynamic DNS Services

1. Ensure that the router is informing your Dynamic DNS provider with latest IP address assigned by your ISP.
   
      1. Use of duckdns.org or dtdns.com etc
      2. Use of DNS-O-Matic to dynamically update the External IP address for your home router as soon as it is changed by the ISP.
   
2. Allocate the Dynamic DNS to DNS name purchased from Domain Name registrar like Namecheap etc.


## Hosting a service from Home Server:

!!! quote "Question we are first going to answer is:"
    **If we want to host on server from home, what do we need to do?**

### Pre-requisites

- Ensure you are able to do changes to your router setting that allows you to:

      1. Create port forwarding rules
      2. Update the DynamicDNS each time your ISP changes External IP address for your router.

- We need to decide the operating system and web server we want to use?
      
      * The request from Internet when it reaches the router it is just dealing in numbers and not strings so it does not really know what information to send back unless it gets it back from the device where the information resides. 
      * In order for the device, that has the requested information, to provide it such that router can send it out, we need to have these web servers, that do the job of translating the information exchange, between router and the device, into a format that the router and eventually the device can understand. 
      * So as an example, if the request was on http protocol, it would mean it is for a web page and router knows that it is for port 80, and will forward it to the IP address you assigned for port 80 - Router is assuming ofcourse that you know what you are doing. 
      * In other words it is your (human) responsibility to ensure that when this request lands on said IP address someone is there to receive it - that someone is the `Web Server` we are now talking about.

## Web Servers

The two commonly used web-servers are:

1. Apache
2. Nginx


There are other servers too for various other scenarios but the most popular options are the two above.

!!! question "Can we have both web servers running on same machine?"
    Yes, the routing of information will be similar to the flow below:
    
    *Internet -> Home Router -> Primary Server -> Other servers in home network accessed through reverse proxy and connected to world only through Primary Server.*


## Operating System

Assuming that we decide to go with Apache Server. You will need to install it on your laptop. This brings us to the first controversial topic, that of operating system your laptop is using. It can be anything from Windows, Mac to a range of Linux Distros. As we are talking open source, lets assume it is will be a linux distro but there are so many to chose from, so which one?

A safe choice is to opt for Debian based distro as it is easy to start with. In that too, Debian 9 (code named: Stretch) at the time of writing is latest stable version and is most recommended. I will assume for the purpose of this article that the reader will use Debian 9 (Stretch). I will also assume that reader is not aware of working on a Linux environment. Advanced users may find some of the information here obvious or boring as I explain few things at length.

## Prepare the laptop

* Step 1 - Find out whether the laptop is 32 bit or 64 bit.
* Step 2 - Download a copy of the Debian 9 (Stretch) applicable to the specific version of your laptop (32 bit / 64 bit)
* Step 3 - Create a Live DVD / USB and test drive the OS
* Step 4 - Install it. You will be asked to provide root password, username and user password. Make note of each of these as you will need them later.
* Step 5 - Update, Upgrade and Dist Upgrade

Open the terminal of the laptop and type following commands:

```bash linenums="1"
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade
```