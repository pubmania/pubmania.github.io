---
title: "Ethercalc"
slug: "ethercalc"
toc: false
classes: "wide"
date: 2016-08-12T13:06:00
draft: false
description: Ethercalc
last_modified_at: 2016-08-12T15:37:53
---

Ethercalc is good tool which can be selfhosted. It is fairly simple to do so. Though it will be available for anyone who has the URL because there is no inbuilt login mechanism.

I did not dig into making it accessible with a login interface as I lost interest after I made it work on my server and played around a bit with it but it was simply because I got interested in other things and not because the tool isn't fascinating enough. I am fairly certain this will not be overly complicated but for a simple selfhosted spreadsheet solution this is definitely worth playing around with.

The steps I took are as below:

```bash
#Ethercalc plays well wth redis as per their documentation. So Install and start &quot;redis&quot;
sudo dnf install redis
sudo systemctl start redis.service

#Test if &quot;redis&quot; is working
redis-cli ping

#Enable redis to automatically start at the time of system start-up
sudo systemctl enable redis.service

#check if it runs
ethercalc
#Press Ctrl+C to exit

#To run it forever use pm2
pm2 start ethercalc
npm list -g --depth=0

#Change port to whichever port you want Ethercalc to run on by opening app.js 
#and changing port.
nano /home/&lt;yourusername&gt;/.npm-global/lib/node_modules/ethercalc/app.js
#change port and save

#run with pm2 and alias as Ecalc
pm2 start ethercalc  --name &quot;Ecalc&quot;

#check logs using pm2
pm2 logs Ecalc

#Reverse proxy Ethercalc using nginx
sudo nano /etc/nginx/conf.d/ecalc.conf
sudo systemctl restart nginx.service
```
