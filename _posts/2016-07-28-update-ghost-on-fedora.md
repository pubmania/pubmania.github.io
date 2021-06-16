---
title: "Update Ghost on Fedora"
slug: "update-ghost-on-fedora"
toc: false
classes: "wide"
date: 2016-07-28T17:45:00
draft: false
description: Update Ghost on Fedora
last_modified_at: 2016-07-28T22:37:53
---

While the guidance on <a href="http://support.ghost.org/how-to-upgrade/#command-guide">Ghost website</a> is very clear, I did get issues that required steps in troubleshooting. Something to do with lodash and npm version 2 stuff (<mark>node_modules/knex requires lodash@'^3.7.0'</mark>) that I read on one of the <a href="https://github.com/tgriesser/bookshelf/issues/1264">forums</a> specifically the comment from ErisDS on 13/06.
Anyway, reading this I deleted node_modules followed by <code>npm install</code> and it worked. All commands in order as I did are listed below. If my previous posts were used to create the blog nothing here will require sudo or root privileges.
As before all this was done on Fedora 24 Linux OS and following commands will need to be changed where it mentions <em>yoursite</em> and <em>username</em>. If the path is different then obviously entire path needs to be replaced.

```bash
#Copy the entire site as backup. It will be a verbose copy an all access rights will be preserved. 
cp -avr /var/www/html/yoursite /home/<username>/

#Now in the site directory create a directory ghostlatest
mkdir /var/www/html/yoursite/ghostlatest

#change directory to ghostlatest
cd /var/www/html/yoursite/ghostlatest

#now download the latest ghost zip file
curl -LOk https://ghost.org/zip/ghost-latest.zip

#unzip the downloaded file
unzip ghost-latest.zip

#Stop your Ghost instance (assuming Ghost is the alias
#created as per my previous post else replace with 
#whatever alias was used with pm2). 
pm2 stop Ghost

#Change directory and delete old folders and files
cd /var/www/html/yoursite
rm -rf core
rm -rf index.js
rm -rf *.md
rm -rf *.json
rm -rf /var/www/html/yoursite/content/themes/casper

#Remove node_modules because anyway the lodash issue will hit later on.
rm -rf node_modules

#Copy from ghost latest to site directory new folders
cp -avr /var/www/html/yoursite/ghostlatest/core /var/www/html/yoursite
cp -avr /var/www/html/yoursite/ghostlatest/index.js /var/www/html/yoursite
cp -avr /var/www/html/yoursite/ghostlatest/*.md /var/www/html/yoursite
cp -avr /var/www/html/yoursite/ghostlatest/*.json /var/www/html/yoursite

#Optional if you haven't made customisation to default theme.
cp -avr /var/www/html/yoursite/ghostlatest/content/themes/casper /var/www/html/yoursite/content/themes

#Install Latest Version
npm cache clean
npm update
npm install --production

#Start to update dependencies
npm start --production

#Once above command is complete, stop the server and restart using pm2
Ctrl+C
pm2 start Ghost
```
