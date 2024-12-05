---
title: "Metabase - A BI solution that just works"
slug: "metabase-a-bi-solution-that-just-works"
authors: [ankit]
date: 
    created: 2018-12-05 14:35:02
    updated: 2019-04-08 17:36:09
draft: false
description: Metabase - A BI solution that just works
comments: true
categories:
  - Linux
  - Software
  - Troubleshooting
  - Server Setup
---

I like exploring new solutions and anything to do with data always piques my interest. I came across this nice tool through the [list of free self hosted software](https://github.com/Kickball/awesome-selfhosted).

!!! site-abstract "UPDATE"
    I am still getting introduced to the world of docker and while most of it just works few things confuse the hell out of me. 
        
    Anyway what happened is there was an update for Metabase and I wanted to apply it on my container and in doing so I realised that some of this post can be changed to make it a better experience from get go because after update all my config and dashboards were gone and I had to reconfigure everything. 
        
    It could be that my lack of knowledge meant I did something wrong and faced the issue but irrespective doing it as per updated post below will ensure you dont face the issue at all because I have now tested it twice to ensure it works well.

<!-- more -->

I have also added the steps to update the metabase to latest docker image as it worked for me.

The overall impression when I opened their site can be summed up with WOW\!\! Now they offer simple docker install supported officially by them and the guide to install docker image is simple enough but the few
simple steps I followed are as below:

1.  Create an A-record for a subdomain for metabase
2.  Download the official *metabse* docker image from dockerhub
3.  Create an apache server conf file for metabase
4.  Run the metabase docker image
5.  Access metabase docker image using subdomain URL
6.  Configure your database on metabase
7.  Run Certbot to make the URL https
8.  Done\!\!

## Create A-record for subdomain

Using the process for your Domain Name Regsitrar create an A-Record for
a subdomain you would want to use for metabase. For this guide we will
assume that the subdomain being created is called **"metabase"** so if
your domain name is say *yourdomain.com* then the URL to access metabase
will be *metabase .yourdomain .com*.

!!! note
    It is important that if you use a different subdomain name, please replace metabase with the subdomain name you have chosen in all Apache conf file samples in sections below.

More detailed steps are available on previous post [HERE](./2018-06-15-prosody-behind-apache-on-debian-stretch.md/#create-a-sub-domain-record)

## Download and Create Apache Conf

```bash linenums="1"
docker pull metabase/metabase
cd /etc/apache2/sites-available/
sudo nano metabase.conf
```
Create a conf file similar to what is shown below:

```javascript linenums="1"
<VirtualHost *:80>
    ServerName metabase.yourdomain.com
    ServerAlias metabase.yourdomain.com

    ErrorLog ${APACHE_LOG_DIR}/error_metabase.log
    CustomLog ${APACHE_LOG_DIR}/access_metabase.log combined

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http:/localhost:3000/
    ProxyPass "/ws2/"  "ws://localhost:3000/"
    ProxyPass "/wss2/" "wss://localhost:3000/"        
 </VirtualHost>
```
Save this by pressing `Ctrl+X` and issue following commands to enable site and reload the apache server.

```bash linenums="1" 
 sudo a2ensite metabase.conf
 sudo systemctl reload apache2
```

## Run Metabase docker image

```bash linenums="1"
docker run -d -p 3000:3000 --name metabase metabase/metabase
```
If all goes well, you should have metabase already running. If you get an error to the effect saying port 3000 is already in use, you will perhaps have to run it on another port (say 12345) but as metabase container would have been created you will need to issue following commands.

```bash linenums="1"
docker rm metabase
docker run -d -p 12345:3000 --name metabase metabase/metabase
```
In addition to avoid running the database through the container we must anyway move it to filesystem. Using commands below:

```bash linenums="1"
mkdir /var/www/metabase
```
This command will create metabase directory on the path /var/www/metabase but you can as easily chose another path as you wish. If you do, just remember to update it in next commands.

```bash linenums="1"
docker ps
```
This will show you the active docker containers. Copy the container ID in first column for the row where under Names you see "metabase" which is the container name we have given using previosu commands.Now copy the
database from container to local filesystem.

```bash linenums="1"
cd /var/www/metabase
docker cp <container ID>:/metabase.db ./
```

Now Stop and rename the container

```bash linenums="1"
docker stop metabase
docker rename metabase metabase_old
```

Finally run Metabase Docker Image while pointing it to your filesystem for database file.

```bash linenums="1"
docker run -d -p 12345:3000 -v ~/metabase-data:/var/www/metabase -e "MB_DB_FILE=/var/www/metabase/metabase.db" --name metabase metabase/metabase
```
The above docker command can be explained as below:
    
`docker run -d  `- This is telling system to start a container in detached mode. By design, containers started in detached mode exit when the root process used to run the container exits.
    
 ` -p 12345:3000` -  This is telling docker to make the container map port 12345 to port 3000 which is the default port on which metabase starts its server.
    
`-v ~/metabase-data:/var/www/metabase`- This part is telling docker to map the "metabase-data" directory in the container to "/var/www/metabase" on the filesystem. In other words, mounting the local volume at path "/var/www/metabase" onto the container in "metabase-data" directory.
    
`--name metabase metabase/metabase`- Finally this part of command is telling docker to name the container "metabase" and to use the docker image "metabase/metabase" from dockerhub


Do bear in mind if you change the port as explained above, you will also need to change the port in apache conf file in previous step. So your apache conf file in this case will look as shown below:
```javascript linenums="1"
    <VirtualHost *:80>
        ServerName metabase.yourdomain.com
        ServerAlias metabase.yourdomain.com
    
        ErrorLog ${APACHE_LOG_DIR}/error_metabase.log
        CustomLog ${APACHE_LOG_DIR}/access_metabase.log combined
    
        ProxyPreserveHost On
        ProxyPass / http://localhost:12345/
        ProxyPassReverse / http:/localhost:12345/
        ProxyPass "/ws2/"  "ws://localhost:12345/"
        ProxyPass "/wss2/" "wss://localhost:12345/"
        
    </VirtualHost>
```
## Access and configure on browser

!!! note
    Access your metabase using the subdomain url - *http:// metabase.yourdomain .com* and it should walk you through the initial configuration. If you do not want to add a database and just play with the tool, they have kindly provided a sample database.


It might be useful for you to create a "user" in your database that has "read only" access and then use that "user" when you configure metabase. Metabase will only ever need read access as it cannot be used to modify data in your database.


## Enable SSL

Once you are happy with your configuration from step above, just run the certbot to enable https using letsencrypt certificate. On Debian this could be as simple as issuing the command

```bash linenums="1"
sudo certbot
```
Once above step is created you will have an additional conf file named **metabase-le-ssl.conf** created in the location `/etc/apache2/sites-available`. Check this and once it is there you are all set to access your new functional metabase instance on https. More detailed steps are available on previous post [HERE](./2018-06-15-prosody-behind-apache-on-debian-stretch.md/#enable-ssl-set-up-using-lets-encrypt)

## Update version

Updating on docker image is pretty straight forward and provided you have followed steps above should not result in you loosing all the effort once update has completed.

```bash linenums="1"
#docker rm metabase_old
docker stop metabase

#docker rename metabase metabase_old
docker pull metabase/metabase

docker start metabase
```

From my recent messing around, I have come to realise that so long as the first start of the docker image was done using environment variables pointing to correct database directory, there is no need to run the commented lines above and a simple stop, upgrade and start should work just fine. Enjoy!!!