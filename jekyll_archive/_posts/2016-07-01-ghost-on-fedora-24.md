---
title: "Ghost on Fedora 24"
slug: "ghost-on-fedora-24"
toc: false
classes: "wide"
date: 2016-07-01T11:37:53
draft: false
description: Ghost on Fedora 24
last_modified_at: 2016-07-01T11:37:53
---
To install Ghost as my blogging platform, I had to go through a number of hoops and one of them was to get the nodejs working and what not. I figured this might as well be worth documenting in case I have to do this all over again. It might also be helpful for some other inquisitive minds. :)
The most useful reference I found was the post on rosehosting website specific to CentOS 7<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>
It would have all gone well too; had it not been for the nodejs related issues which resulted in me finding the other helpful pointers from various forums.
Anyway, the steps I took to get this all working are:
<ul>
<li><a href="#step1installnodejsandnpm">Step 1: Install nodejs and npm</a></li>
<li><a href="#step2installdependencies">Step 2: Install dependencies</a></li>
<li><a href="#step3installnpmmodules">Step 3: Install npm modules</a></li>
<li><a href="#step4configurenginx">Step 4: Tell Ghost your blog URL</a></li>
<li><a href="#step5startghostandnginx">Step 5: Start Ghost and nginx</a></li>
</ul>
These are detailed in my notes below - keeping it, where I can, true to the post I have referred above:
<h3 id="step1installnodejsandnpm">Step 1: Install nodejs and npm</h3>
On Fedora 24 node.js package already includes npm and if you try installing npm separately it will throw an error so just install node.js and npm will be installed along with it.
<pre class="line-numbers language-bash"><code>sudo dnf distro-sync
sudo dnf install nodejs</code></pre>
<h3 id="step2installdependencies">Step 2: Install dependencies</h3>
<pre class="line-numbers language-bash"><code>sudo dnf install php php-fpm php-cli php-mysql php-curl php-gd

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
└── README.md</code></pre>
<h3 id="step3installnpmmodules">Step 3: Install npm modules</h3>
While installing/initiating npm modules, there were several errors that system was throwing. They were in two categories:
<ul>
<li>Access Related</li>
<li>Dependencies Related</li>
</ul>
<strong>Access Related</strong> - I was getting EACCES error and solution given on on npmjs.com under Option 2 is what sorted the access issues <sup class="footnote-ref"><a href="#fn1" id="fnref1:1">[1:1]</a></sup>.
<pre class="line-numbers language-bash"><code>mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
nano ~/.profile</code></pre>
Add the line <code>export PATH=~/.npm-global/bin:$PATH</code> in the opened file.
<pre class="line-numbers language-bash"style="counter-reset: linenumber 3;"><code>source ~/.profile</code></pre>
<strong>Dependencies Related</strong> - Some forum hopping later I just followed the advice on Ghost support<sup class="footnote-ref"><a href="#fn1" id="fnref1:2">[1:2]</a></sup> and installed the dependencies. Steps below:
<pre class="line-numbers language-bash"><code>#install required dependencies:
npm install -g node-gyp
sudo dnf install gcc gcc-c++</code></pre>
Once above dependencies are installed following code should just work.
<div class="boxed">NOTE: 
Make sure you are in the directory you created in step2.</div>
<pre class="line-numbers language-bash"><code>#Install PM2 a process manager to control Node.js applications 
#It will help in keeping specified Node.js applications alive forever:
npm install pm2 -g
#Install 
npm install --production
#Start Ghost with pm2 and create a name for the pm2
NODE_ENV=production pm2 start index.js --name "Ghost"
</code></pre>
<h3 id="step4tellghostyourblogurl">Step 4: Tell Ghost your blog URL</h3>
A very simple change is required to config.js file as shown below:
<pre class="line-numbers language-bash"><code>#Copy the sample config file
cp config.example.js config.js
nano config.js</code></pre>
File that opens will have following javascript:
<pre class="line-numbers language-javascript"><code>// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org$

// Ghost runs in `development` mode by default. Full documentation can be found$

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: 'http://your.blog.com',
</code></pre>
It's the line number 14 in above code block where you need to replace <code>http://your.blog.com</code> with actual url of your blog.
<h3 id="step4configurenginx">Step 4: Configure Nginx</h3>
NGINX install and configuration is something I covered in my post for installing Seafile on Fedora 24<sup class="footnote-ref"><a href="#fn1" id="fnref1:3">[1:3]</a></sup>. So I already had a running nginx. I just needed to create a reverse proxy for Ghost on the existing nginx server.
Open the hostfile using following command:
<pre class="language-bash"><code>sudo nano /etc/hosts</code></pre>
Now in the hosts file add the localhost alias for blog - in this example it is <code>your.localhost.com</code>.
<pre class="language-none"><code>127.0.0.1  localhost.localdomain localhost your.seafile.com your.blog.com</code></pre>
Open the file using following command.
<div class="boxed">NOTE:
Replace `yourblog.conf` with your actual blog's conf file name.</div>
<pre class="language-bash"><code>nano /etc/nginx/conf.d/yourblog.conf</code></pre>
On the file that opens copy and paste the following code.
<div class="boxed">NOTE:
Replace `your.blog.com` on line number 6 below with alias for localhost for this blog you added to the host file above.</div>
<pre class="line-numbers language-nginx"><code>upstream ghost {
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
</code></pre>
<h3 id="step5startghostandnginx">Step 5: Start Ghost and nginx</h3>
After all the above steps are completed issue following commands to restart ghost and nginx.
<pre class="line-numbers language-bash"><code>sudo systemctl restart nginx.service
pm2 restart Ghost</code></pre>
All Done !!!
<h3 id="references">References:</h3>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><strong>GHOST_URL</strong>/seafile-server-behind-nginx-on-fedora-24-security-lab-spin/ <a href="#fnref1" class="footnote-backref">↩︎</a> <a href="#fnref1:1" class="footnote-backref">↩︎</a> <a href="#fnref1:2" class="footnote-backref">↩︎</a> <a href="#fnref1:3" class="footnote-backref">↩︎</a>
</li>
</ol>
</section>
