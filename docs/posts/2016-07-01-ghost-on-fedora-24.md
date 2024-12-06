---
title: Ghost on Fedora 24
slug: ghost-on-fedora-24
date: 
  created: 2016-07-01 11:37:53
  updated: 2016-07-01 11:37:53
draft: False
description: Ghost on Fedora 24
authors: ['ankit']
comments: false
categories:
  - Linux
  - Software
  - Troubleshooting
  - Network Setup
  - Server Setup
  - Development
  - Blogging
---

To install Ghost as my blogging platform, I had to go through a number of hoops and one of them was to get the nodejs working and what not. I figured this might as well be worth documenting in case I have to do this all over again. It might also be helpful for some other inquisitive minds. :smile:

The most useful reference I found was the post on rosehosting website specific to CentOS 7.

It would have all gone well too; had it not been for the nodejs related issues which resulted in me finding the other helpful pointers from various forums.

Anyway, the steps I took to get this all working are detailed in my notes below - keeping it, where I can, true to the post I have referred above:

<!-- more -->

## Step 1: Install nodejs and npm

On Fedora 24 node.js package already includes npm and if you try installing npm separately it will throw an error so just install node.js and npm will be installed along with it.

```bash linenums="1"
sudo dnf distro-sync
sudo dnf install nodejs
```
## Step 2: Install dependencies

```bash linenums="1"
sudo dnf install php php-fpm php-cli php-mysql php-curl php-gd

#Create a directory for the website:
mkdir /var/www/html/[sitefolder. eg: blog, myblog, banana] 

#Change to the newly created directory:
cd /var/www/html/[sitefolder. eg: blog, myblog, banana] 

#Set access permissions for this directory
chown -R /var/www/html/[sitefolder. eg: blog, myblog, banana]

#Download latest version of Ghost:
curl -L https://ghost.org/zip/ghost-latest.zip -o ghost.zip

#Unzip the downloaded file
unzip ghost.zip

#Finally check the directory structure
tree -L 2

#OUTPUT of above command should look like as shown below:
.
├── config.example.js
├── config.js
├── content
│   ├── apps
│   ├── data
│   ├── images
│   └── themes
├── core
│   ├── built
│   ├── index.js
│   ├── server
│   └── shared
├── ghost.zip
├── Gruntfile.js
├── index.js
├── LICENSE
├── npm-shrinkwrap.json
├── package.json
├── PRIVACY.md
└── README.md
```

## Step 3: Install npm modules

While installing/initiating npm modules, there were several errors that system was throwing. They were in two categories:

* Access Related
* Dependencies Related

**Access Related** - I was getting EACCES error and solution given on on npmjs.com under Option 2 is what sorted the access issues.

```bash linenums="1"
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
nano ~/.profile
```
Add the line `export PATH=~/.npm-global/bin:$PATH` in the opened file.

```bash linenums="3"
source ~/.profile
```
**Dependencies Related** - Some forum hopping later I just followed the advice on Ghost support and installed the dependencies. Steps below:

```bash linenums="1"
#install required dependencies:
npm install -g node-gyp
sudo dnf install gcc gcc-c++`</pre>
Once above dependencies are installed following code should just work.
<div class="boxed">NOTE: 
Make sure you are in the directory you created in step2.</div>
<pre class="line-numbers language-bash">`#Install PM2 a process manager to control Node.js applications 
#It will help in keeping specified Node.js applications alive forever:
npm install pm2 -g
#Install 
npm install --production
#Start Ghost with pm2 and create a name for the pm2
NODE_ENV=production pm2 start index.js --name "Ghost"
```

## Step 4: Tell Ghost your blog URL

A very simple change is required to config.js file as shown below:

```bash linenums="1"
#Copy the sample config file
cp config.example.js config.js
nano config.js
```

File that opens will have following javascript:
```javascript linenums="1"
// ## Ghost Configuration
// Setup your Ghost install for various environments.
// Ghost runs in `development` mode by default. Full documentation can be found at https://support.ghost.org

var path = require('path'),
    config;

config = {
    // #### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: 'http://your.blog.com',
```

It's the line number 14 in above code block where you need to replace `http://your.blog.com` with actual url of your blog.

## Step 5: Configure Nginx

NGINX install and configuration is something I covered in my post for installing Seafile on Fedora 24. So I already had a running nginx. I just needed to create a reverse proxy for Ghost on the existing nginx server.

Open the hostfile using following command:

```bash
sudo nano /etc/hosts
```

Now, in the hosts file add the localhost alias for blog - in this example it is `your.localhost.com`.

```bash
127.0.0.1  localhost.localdomain localhost your.seafile.com your.blog.com
```
Open the file using following command.

!!! note
    Replace `yourblog.conf` with your actual blog's conf file name.

```bash
nano /etc/nginx/conf.d/yourblog.conf
```

On the file that opens copy and paste the following code.

!!! note
    Replace `your.blog.com` on line number 6 below with alias for localhost for this blog you added to the host file above.

```bash linenums="1"
upstream ghost {
server 127.0.0.1:2368;
}
server {
     listen      80;
     server_name your.blog.com;
     access_log  /var/log/nginx/ghost.access.log;
     error_log   /var/log/nginx/ghost.error.log;
     proxy_buffers 16 64k;
     proxy_buffer_size 128k;

        location / {
         proxy_pass  http://ghost;
         proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
         proxy_redirect off;
         proxy_set_header    Host            $host;
         proxy_set_header    X-Real-IP       $remote_addr;
         proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header    X-Forwarded-Proto https;
     }
  }
```

## Step 6: Start Ghost and nginx
After all the above steps are completed issue following commands to restart ghost and nginx.

```bash linenums="1"
sudo systemctl restart nginx.service
pm2 restart Ghost
```

All Done !!!

