---
title: Swap File to create extra memory
slug: swap-file-to-create-extra-memory
classes: wide
date: 
  created: 2016-12-14 19:29:54
  updated: 2017-03-02 15:37:53
draft: False
description: Swap File to create extra memory
authors: ['ankit']
comments: true
categories:
  - Linux
  - Operating System
  - Troubleshooting
---

While renewing my LetsEncrypt certificate, I found myself in a strange situation where the certbot won't run asking me to update pip and then each time I tried updating pip it failed with the error `error: command 'x86_64-linux-gnu-gcc' failed with exit status 4.`

It turns out that this happens due to low memory and with my digitalocean droplet being the cheapest one this was bound to happen sooner rather than later. Fortunately there is a way around it as explained below.

Use of following commands will ensure that the swap file is created which in turn will help avoid the 'error: command 'x86_64-linux-gnu-gcc' failed with exit status 4'.

Following commands will create a swap file:

<!-- more -->

```bash linenums="1"
sudo dd if=/dev/zero of=/swapfile1 bs=1024 count=524288
sudo mkswap /swapfile1
sudo chown root:root /swapfile1
sudo chmod 0600 /swapfile1
sudo swapon /swapfile1
```
The swap file will now be activated but will be gone after the reboot. It can be reactivated using the last command (I ~~hope so~~ know as I have now tried it).

Anyway, after creating the swapfile, you will be able to upgrade pip without the aforementioned error. :smile:

!!! abstract "Update: 02/03/2017"
    I ran into memory issues yet again and I thought instead of increasing the memory for swapfile1, what if I can create another swapfile. I tried this and it works. Infact I felt quite nice uncovering a concept of multiple swapfiles purely based on my whim :wink:. All I really had to do was repeat above code replacing swapfile1 with swapfile2 and I had two swapfiles working together increasing available memory for my server.

```bash linenums="1"
sudo dd if=/dev/zero of=/swapfile2 bs=1024 count=524288
sudo mkswap /swapfile2
sudo chown root:root /swapfile2
sudo chmod 0600 /swapfile2
sudo swapon /swapfile2
```

Thing is after it worked I was a bit intrigued by the concept and read a bit more on `swapon / swapoff` and few useful commands are listed below:

```bash linenums="1"
## To enable all swapfiles 
swapon -a
## To disable all swapfiles
swapoff -a
## To see all available swapfiles 
swapon -s
## To enable a particular swapfile
swapon <filename>
```
