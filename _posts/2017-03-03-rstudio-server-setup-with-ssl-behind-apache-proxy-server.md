---
title: "Rstudio Server Setup with SSL behind Apache proxy server"
slug: "rstudio-server-setup-with-ssl-behind-apache-proxy-server"
toc: true
classes: "wide"
date: 2017-03-03T15:10:00
draft: false
description: Rstudio Server Setup with SSL behind Apache proxy server
last_modified_at: 2018-03-29T15:37:54
---

<h2 id="installrusingfollowingcommands">Install R using following commands:</h2>

```bash
sudo apt-get install r-base libapparmor1 gdebi-core
# Check that R is installed
R
#quit R
q()
```

<h2 id="installrstudioideserver">Install Rstudio IDE server</h2>
```bash
cd Downloads/
wget https://download2.rstudio.org/rstudio-server-1.0.136-amd64.deb
sudo gdebi rstudio-server-1.0.136-amd64.deb
```

At this point if all goes well you can check the status of rstudio server by issuing the command:
```bash
sudo systemctl status rstudio-server.service
```

The server is started automatically at port 8787 and can be accessed using &lt;ip_address:8787&gt; in browser of your choice, provided all firewall settings have been taken care of.

However, when you open the Rstudio server you will be presented with a logon screen and while you can access this using the users for the machine it is hosted on, it will be prudent to create a lower privilege user as explained in next section.
<h2 id="addusertoaccesstherstudio">Add User to access the RStudio</h2>

```bash
sudo adduser rstudio
```
<h2 id="setupsslandreverseproxyforrstudioserver">Set up SSL and reverse proxy for R-Studio Server</h2>

Now important thing to note is that community version of Rstudio server does not come with SSL enabled but just to run it on a secure socket layer you don't necessarily need the pro version. By following the steps below, your communication with the server will be on SSL.

However to achieve the objective we need to accomplish following steps:

<ol>
<li>Enable modules on Apache to help set up proxy</li>
</ol>
<ul>
<li>Configure a proxy to control access to RStudio Server</li>
<li>Use LetsEncrypt to enable SSL</li>
<li>Restrict access to Rstudio server only through proxy</li>
<li>Restart both Rstudio and Apache servers</li>
</ul>

<h4 id="step1enablemodulesonapachetohelpsetupproxy">Step 1: Enable modules on Apache to help set up proxy</h4>

There is guidance on how to do this on [Rstudio Support](https://support.rstudio.com/hc/en-us/articles/200552326-Running-RStudio-Server-with-a-Proxy). However, there was a bit of hair pulling and head scratching involved to get all the steps above work together so stick with me but keep that link in back pocket for variations or when you are stuck.

With head scratching and hair pulling I mean that I encountered errors such as these - `AH01102 error reading status line from remote server`, `Rstudio Proxy redirect changing the URL to localhost` and many others which can be avoided by following steps as explained below. Anyway so we need to enable `mod_proxy` and `mod_proxy_wstunnel` modules. As Apache is already installed and mod_proxy already enabled I did not have to install the module itself, but if it needs to be done the commands are:

```bash
sudo apt-get install libapache2-mod-proxy-html
sudo apt-get install libxml2-dev
```

Issuing the following commands should enable the relevant modules:
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
```

<h4 id="step2configureaproxytocontrolaccesstorstudioserver">Step 2: Configure a proxy to control access to RStudio Server</h4>
```bash
# Change directory to sites-available
cd /etc/apache2/sites-available
# create a rstudio conf file
sudo nano rstudio.conf
```

Paste the following in the conf file but make sure to change details relevant to your set-up for each entry (line numbers 2, 3, 4, 15 and 16 below):
```html
<VirtualHost *:80>;
        ServerAdmin user@yoursite.com
        ServerName yoursite.com
        ServerAlias whatever.yoursite.com

#Specify path for Logs
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        RewriteEngine on

#Rewrite the url supplied to ensure https is applied
        RewriteCond %{SERVER_NAME} =yoursite.com [OR]
        RewriteCond %{SERVER_NAME} =whatever.yoursite.com
        RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]

# Following lines should open rstudio directly from the url
        RewriteCond %{HTTP:Upgrade} =websocket
        RewriteRule /(.*)     ws://localhost:8787/$1  [P,L]
        RewriteCond %{HTTP:Upgrade} !=websocket
        RewriteRule /(.*)     http://localhost:8787/$1 [P,L]
        ProxyPass / http://localhost:8787/
        ProxyPassReverse / http://localhost:8787/

</VirtualHost>;

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```

Press `Ctrl+x` and save the file.

{: .notice-info}
TIP: If you just want reverse proxy and no SSL, you can just comment out line 15, 16 and 17 in above conf file and you are all set. If you do want to enable SSL, enabling the site with commands below won't probably work just yet and subsequent steps will need to be completed.


Now enable the new site by issuing the commands:
```bash
sudo a2ensite rstudio.conf
sudo service apache2 restart
```

<h4 id="step3useletsencrypttoenablessl">Step 3: Use LetsEncrypt to enable SSL</h4>

Follow the instructions [here](https://certbot.eff.org/) for specific usecase but one way or the other using Certbot you will be able to obtain the LetsEncrypt SSL certificate and enable it on your server.

Once certbot has completed doing it's thing you would find an additional conf file in <code>/etc/apache2/sites-available</code> named `rstudio-le-ssl.conf`. It will be pretty much same content as in rstudio.conf with very minor changes. The first line will be listening on 443 instead of 80 and the ssl certificates will be included. Normally you would not need to tweak anything in the resultant file but just for reference the contenst of this file will look as below:

```html
<IfModule mod_ssl.c>
<VirtualHost *:443>

        ServerAdmin user@yoursite.com
        ServerName yoursite.com
        ServerAlias whatever.yoursite.com

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

RewriteEngine on
# Following lines should open rstudio directly from the url
        RewriteCond %{HTTP:Upgrade} =websocket
        RewriteRule /(.*)     ws://localhost:8787/$1  [P,L]
        RewriteCond %{HTTP:Upgrade} !=websocket
        RewriteRule /(.*)     http://localhost:8787/$1 [P,L]
        ProxyPass / http://localhost:8787/
        ProxyPassReverse / http://localhost:8787/

SSLCertificateFile /etc/letsencrypt/live/whatever.yoursite.com/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/whatever.yoursite.com/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
</IfModule>
```

<h4 id="restrictaccesstorstudioserveronlythroughproxy">Restrict access to Rstudio server only through proxy</h4>
Finally, we want to ensure that access to the Rstudio server is only through the proxy we configured and to do that we just need to specify this in the rstudio server configuration the attribute that tells it to only serve requests from localhost.

```bash
sudo nano /etc/rstudio/rserver.conf
```

Now on the opened file type `www-address=127.0.0.1` and press `Ctrl+x` and save the file.

<h4 id="restartbothrstudioandapacheservers">Restart both Rstudio and Apache servers</h4>

Finally issue the following commands to restart both the servers:
```bash
sudo systemctl restart rstudio-server.service
sudo service apache2 restart
```

This is it. Now your new Rstudio server is ready to be used through secure socket layer.