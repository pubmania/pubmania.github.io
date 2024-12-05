---
title: Tomcat 8.5.4 on Fedora behind Nginx
slug: tomcat-on-fedora-behind-nginx
date: 
  created: 2016-07-25 17:52:00
  updated: 2016-07-25 17:52:00
draft: False
description: Tomcat 8.5.4 on Fedora behind Nginx
authors: ['ankit']
comments: true
categories:
  - Linux
  - Software
  - Server Setup
  - Development
---

## Install Oracle Java

```bash linenums="1"
#install jdk
wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u102-b14/jdk-8u102-linux-i586.rpm"
#install jre
wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http://www.oracle.com/ oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u102-b14/jre-8u102-linux-i586.rpm"
#enable firefox plugin
alternatives --install /usr/lib/mozilla/plugins/libjavaplugin.so libjavaplugin.so /usr/java/jdk1.8.0_102/jre/lib/i386/libnpjp2.so 20000
```

!!! site-tip "Tip"
    URL for JDK and JRE is best obtained directly from [oracle website](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

<!-- more -->

## Download Tomcat

```bash linenums="1"
su
mkdir /opt/tomcat/ && cd /opt/tomcat
wget http://mirror.ox.ac.uk/sites/rsync.apache.org/tomcat/tomcat-8/v8.5.4/bin/apache-tomcat-8.5.4.zip
wget https://www.apache.org/dist/tomcat/tomcat-8/v8.5.4/bin/apache-tomcat-8.5.4.zip.md5
```

## Check MD5

```bash linenums="1"
cat apache-tomcat-8.5.4.zip.md5
md5sum apache-tomcat-8.5.4.zip
unzip apache-tomcat-8.5.4.zip
```

## Create a TOMCAT Group and User then grant access

```bash linenums="1"
groupadd tomcat
useradd -M -s /bin/nologin -g tomcat -d /opt/tomcat tomcat
cd /opt/tomcat
chgrp -R tomcat conf
chmod g+rwx conf
chmod g+r conf/*
chown -R tomcat bin/ webapps/ work/ temp/ logs/
```

## Create Service for Tomcat

```bash
nano /etc/systemd/system/tomcat.service
```

```bash linenums="1" title="/etc/systemd/system/tomcat.service"
## Systemd unit file for tomcat
[Unit]
Description=Apache Tomcat Web Application Container
After=syslog.target network.target

[Service]
Type=forking

ExecStart=/opt/tomcat/apache-tomcat-8.5.4/bin/startup.sh
ExecStop=/opt/tomcat/apache-tomcat-8.5.4/bin/shutdown.sh

User=tomcat
Group=tomcat

[Install]
WantedBy=multi-user.target

```

```bash linenums="1"
systemctl start tomcat.service
systemctl enable tomcat.service
```

## Alternative start and stop

```bash linenums="1"
cd apache-tomcat-8.5.4/bin
chmod 700 /opt/tomcat/apache-tomcat-8.5.4/bin/*.sh
ln -s /opt/tomcat/apache-tomcat-8.5.4/bin/startup.sh /usr/bin/tomcatup
ln -s /opt/tomcat/apache-tomcat-8.5.4/bin/shutdown.sh /usr/bin/tomcatdown
tomcatup
tomcatdown
```

## Change port

```bash
nano /opt/tomcat/apache-tomcat-8.5.4/conf/server.xml
```

Around line 69 is the connector tag where the `port=8080` is specified. For this example lets change it to 8081. After change the connector tag in server.xml will look as below:

```xml linenums="1" title="/opt/tomcat/apache-tomcat-8.5.4/conf/server.xml"
<Connector port="8081" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" >;
```

## Add tomcat Users

Open tomcat-users.xml and add new users before <tomcat-user> tag

```bash
nano /opt/tomcat/apache-tomcat-8.5.4/conf/tomcat-users.xml
```
sample user:
```xml linenums="1" title="/opt/tomcat/apache-tomcat-8.5.4/conf/tomcat-users.xml"
<role rolename="admin-gui"/><br>
<user username="admin" password="some admin password" roles="admin-gui"/><br>
<role rolename="manager-gui"/><br>
<user username="jhondoe" password="some password" roles="manager-gui"/>
```

## Test

```bash linenums="1"
touch /opt/tomcat/apache-tomcat-8.5.4/webapps/ROOT/testankit.jsp
nano /opt/tomcat/apache-tomcat-8.5.4/webapps/ROOT/testankit.jsp
#restart tomcat
systemctl restart tomcat.service
```

Open the browser and enter [http://localhost:8080](http://localhost:8080) <em>(or whatever port you have configured Tomcat on.)</em>

## Configure Nginx Reverse Proxy for Tomcat

* Configure the dynamic DNS. Steps will be as per my [previous post](./2016-07-20-ddclient-on-fedora-2.md). For purpose of this step I will be assuming you created a DDNS named `tomcat.yoursite.com`
  
* Update `/etc/hosts` to include `tomcat.yoursite.com`

  ```bash linenums="1" title="/etc/hosts"
  sudo nano /etc/hosts
  #Make an entry in your hosts
  127.0.0.1  localhost.localdomain localhost your.seafile.com your.blog.com tomcat.yoursite.com
  ```
  
* Now create nginx conf file using `sudo nano /etc/nginx/conf.d/tomcat.conf` as shown below:
  
```bash linenums="1" title="/etc/nginx/conf.d/tomcat.conf"
upstream tomcat {
server 127.0.0.1:8081;
}

server {
      listen      80;
      server_name tomcat.yoursite.com;
      access_log  /var/log/nginx/tomcat.access.log;
      error_log   /var/log/nginx/tomcat.error.log;
      proxy_buffers 16 64k;
      proxy_buffer_size 128k;

        location / {
          proxy_pass  http://tomcat;
          proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
          proxy_redirect off;
          proxy_set_header    Host            $host;
          proxy_set_header    X-Real-IP       $remote_addr;
          proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header    X-Forwarded-Proto https;
      }
  }
```

* Finally reload and restart services

  ```bash linenums="1"
  sudo systemctl daemon-reload
  sudo systemctl start nginx.service
  sudo systemctl start tomcat.service
  ```
