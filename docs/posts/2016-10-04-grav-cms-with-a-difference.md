---
title: Grav - CMS with a difference
slug: grav-cms-with-a-difference
date: 
  created: 2016-10-04 12:09:00
  updated: 2018-03-29 15:37:53
draft: False
description: Grav - CMS with a difference
authors: ['ankit']
comments: true
---

While I love Ghost as a blogging platform, it is not best placed for things other than blogs - after all that is the basic idea behind creation of this wonderful tool.

As I wanted to host a static website using tools that don't require a database or rely on php, I went searching on interwebs.
I came across a lot of options and the most popular one appears to be Jekyll and it's variants (Nikola and such) but they require a lot of terminal activity which won't go well for regular end user responsible for maintaining content of the static website in question.So I continued looking and came across this wonderful project called [Grav](http://getgrav.org).

Grav is super fast, very pretty and extremely easy to deploy and maintain. Additionally, it has very good documentation.

The key features that I absolutely loved are as below:

<!-- more -->

1. Easy installation - *Easier than Ghost / Wordpress IMHO*
2. Good help and documentation
3. Responsive themes and skeletons
4. Built-in Markdown Support and then some
5. Lot of useful plugins
6. Browser based admin page
7. Active development
8. Easy upgrade and back-up


My steps for installation:

* Download a [skeleton](https://getgrav.org/downloads/skeletons) you fancy
* Unzip the downloaded file into your server root and move it into a folder named grav:

  ```bash linenums="1"
  sudo unzip grav-skeleton-appi-1.0.0.zip -d /var/www/html/
  cd /var/www/html/
  sudo mv grav-skeleton-appi-1.0.0/ grav/
  ```

* Fix permissions (replace username with your user on the server. This is important to ensure files can be modified both from browser as well as from terminal. So create a bash file by issuing command `nano fixpermissions.sh` and paste the following code in there.

  ```bash linenums="1"
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

  ```bash linenums="1"
  cd /var/www/html/grav/
  sudo bash /<path_to_fixpermissions.sh>/fixpermissions.sh
  ```
  
* Open `&lt;server-ip-address&gt;/grav` from the browser and check your install is working
  
* Once it is confirmed to be working, install admin plugin from terminal like so:

  ```bash linenums="1"
  /bin/gpm install admin
  ```

* Open `<server-ip-address>/grav/admin` from the browser and create your admin login details

Working on Grav is an absolutely pleasing experience and the swift turnaround for a static website is phenomenal. Suffice to say, I hope that this project goes from strength to strength.