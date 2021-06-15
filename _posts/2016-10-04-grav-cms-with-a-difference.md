---
title: "Grav - CMS with a difference"
slug: "grav-cms-with-a-difference"
toc: false
classes: "wide"
date: 2016-10-04T12:09:00
draft: false
description: Grav - CMS with a difference
last_modified_at: 2018-03-29T15:37:53
---

While I love Ghost as a blogging platform, it is not best placed for things other than blogs - after all that is the basic idea behind creation of this wonderful tool.

As I wanted to host a static website using tools that don't require a database or rely on php, I went searching on interwebs.
I came across a lot of options and the most popular one appears to be Jekyll and it's variants (Nikola and such) but they require a lot of terminal activity which won't go well for regular end user responsible for maintaining content of the static website in question.So I continued looking and came across this wonderful project called <a href="http://getgrav.org">Grav</a>.

Grav is super fast, very pretty and extremely easy to deploy and maintain. Additionally, it has very good documentation.

The key features that I absolutely loved are as below:


1. Easy installation - * Easier than Ghost / Wordpress IMHO *
1. Good help and documentation
1. Responsive themes and skeletons
1. Built-in Markdown Support and then some
1. Lot of useful plugins
1. Browser based admin page
1. Active development
1. Easy upgrade and back-up


My steps for installation:

* Download a <a href="https://getgrav.org/downloads/skeletons">skeleton</a> you fancy
* Unzip the downloaded file into your server root and move it into a folder named grav:

  ```bash
  sudo unzip grav-skeleton-appi-1.0.0.zip -d /var/www/html/
  cd /var/www/html/
  sudo mv grav-skeleton-appi-1.0.0/ grav/
  ```

* Fix permissions (replace username with your user on the server. This is important to ensure files can be modified both from browser as well as from terminal. So create a bash file by issuing command <code>nano fixpermissions.sh</code> and paste the following code in there.

  ```bash
  ##!/bin/sh
  chown &lt;username&gt;:www-data .
  chown -R &lt;username&gt;:www-data *
  find . -type f | xargs chmod 664
  find ./bin -type f | xargs chmod 775
  find . -type d | xargs chmod 775
  find . -type d | xargs chmod +s
  umask 0002
  ```


* Now make this bash file executable using `chmod a+x fixpermissions.sh`

* Finally run the bash file from within the grav directory:

  ```bash
  cd /var/www/html/grav/
  sudo bash /<path_to_fixpermissions.sh>/fixpermissions.sh
  ```
* Open <code>&lt;server-ip-address&gt;/grav</code> from the browser and check your install is working
* Once it is confirmed to be working, install admin plugin from terminal like so:

  ```bash
  /bin/gpm install admin
  ```
* Open `<server-ip-address>/grav/admin` from the browser and create your admin login details

Working on Grav is an absolutely pleasing experience and the swift turnaround for a static website is phenomenal. Suffice to say, I hope that this project goes from strength to strength.