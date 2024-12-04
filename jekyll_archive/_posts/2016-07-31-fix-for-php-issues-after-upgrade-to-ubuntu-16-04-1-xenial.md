---
title: "Fix for PHP Issues after upgrade to Ubuntu 16.04.1 (Xenial)"
slug: "fix-for-php-issues-after-upgrade-to-ubuntu-16-04-1-xenial"
toc: false
classes: "wide"
date: 2016-07-31T22:08:35
draft: false
description: Fix for PHP Issues after upgrade to Ubuntu 16.04.1 (Xenial)
last_modified_at: 2018-03-29T15:37:53
---
After updating from Ubuntu 14.04, the php and Apache stopped being friends and one of the WordPress site I maintain went all white and admin page was just showing php code.
This is apparently because of a known issue in 16.04 with upgrade to php7 as shown on the ubuntu forum <a href="http://askubuntu.com/questions/756181/installing-php-5-6-on-xenial-16-04">here</a>.

Using the guidance from this link and with some more of <a href="https://duckduckgo.com/">duckduckgo</a> search later, I managed to resolve the problem thus:

```bash
#1. Install aptitude if it is not already installed using 
sudo apt-get install aptitude

#2. Removed php7 and unwanted php using
sudo aptitude purge `dpkg -l | grep php| awk '{print $2}' |tr &quot;\n&quot; &quot; &quot;`

#3. Added old repo using
sudo add-apt-repository ppa:ondrej/php

#4. Updated repo
sudo apt-get update

#5. Installed php5.6
sudo apt-get install php5.6
sudo apt-get install php5.6-mbstring php5.6-mcrypt php5.6-mysql php5.6-xml php5.6-curl php5.6-gd php5.6-zip

#6. Checked php version
sudo php -v

#7. Enabled mod_php
sudo a2enmod php5
Ignored error message

#8. Opened php5.6 conf
sudo nano /etc/apache2/mods-enabled/php5.6.conf

#9. Commented following lines
<IfModule mod_userdir.c>
   <Directory /home/*/public_html>
      php_admin_flag engine Off
    </Directory>
</IfModule>

#10. Restarted the server
sudo service apache2 restart
```
