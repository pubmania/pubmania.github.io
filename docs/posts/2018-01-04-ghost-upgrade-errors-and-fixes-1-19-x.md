---
title: Ghost Upgrade errors and fixes (1.19.x)
slug: ghost-upgrade-errors-and-fixes-1-19-x
date: 
  created: 2018-01-04 19:36:16
  updated: 2018-01-04 19:36:16
draft: False
description: Ghost Upgrade errors and fixes (1.19.x)
authors: ['ankit']
comments: true
---

I have found the recent ghost upgrades quite painless but there have been few hiccups for last two times so I kept a record of what helped and it is as listed below:

General Update should be as simple as:

<!-- more -->

```bash linenums="1"
cd /var/www/html/ghost/
ghost update
```
If after this step, there are any errors or an indication to update ghost-cli, following command should be used.

```bash
sudo npm install -g ghost-cli
```
After this if there are issues accessing the blog over internet, we may need to do a bit of checks. Logical sequence is to first check that access for all folders is right and proper. If it needs to be updated, command to be used is:

```bash linenums="1"
cd ghost
sudo chown -R &lt;your username&gt;:www-data .
cd content/
sudo chown -R ghost:ghost images/
```
If there are any errors when starting ghost, following command is indicated by the ghost-cli and it does help.

```bash
ghost setup linux-user systemd
```
If still accessing the blog is an issue following command will list the ghost log file:

`ghost log`

If there are database migration errors on log file, following commands may help:

```bash linenums="1"
sudo npm install -g knex-migrator
ghost setup migrate
```
!!! site-tip "Tip"
    `ghost setup migrate` does work very well and must be remembered.

If you have digitalocean setup such as mine, memory can be an issue you may want to restart the virtual machine and reload the swap files.

```bash linenums="1"
sudo reboot now
sudo swapon /swapfile1
sudo swapon /swapfile2
```

If update if failing with the message not enough memory try running the following:

```bash
ghost update --no-check-mem
```

If there are still issues accessing the blog with error 503, check the apache logs:

```bash
sudo nano /var/log/apache2/error.log
```

If issue is with accessing the upstream ghost server. Try changing the port on ghost config and updating the apache conf files.

```bash linenums="1"
##Change Directory to ghost install
cd /var/www/html/ghost
##Stop the ghost server
ghost stop
##Change port to another number
nano config.production.json
##Change directory apache2 server
cd /etc/apache2/sites-available/
##Open the ghost.conf file and change the localhost port to same 
##number that was changed in config.production.json
sudo nano ghost.conf
##Open the ghost-le-ssl.conf file and change the localhost port 
##to same number that was changed in config.production.json
sudo nano ghost-le-ssl.conf
##Disable and enable the conf files on apache.
sudo a2dissite ghost.conf ghost-le-ssl.conf
sudo a2ensite ghost-le-ssl.conf ghost.conf 
sudo service apache2 reload 
##Finally change directory to your ghost install 
##and start ghost server.
cd /var/www/html/ghost
ghost start
```