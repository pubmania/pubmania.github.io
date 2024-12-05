---
title: DD-WRT firmware on TP-LINK TL-WR841N v11
slug: dd-wrt-firmware-on-tp-link-tl-wr841n-v11
date: 
  created: 2017-02-02 18:46:00
  updated: 2018-03-29 15:37:53
draft: False
description: Apply Unlocked stock firmware, download all the three files from... Follow these steps... 1. Connect the power supply to the TP-Link router and switch it on. 2. Connect the ethernet cable in one of the yellow LAN slots of the router. ...
authors: ['ankit']
comments: true
categories:
  - Linux
  - Operating System
  - Software
  - Troubleshooting
  - Network Setup
  - Server Setup
  - Router
---

## Background

I have been with PlusNet for over two years now and am a happy camper as far as fiber optic broadband is concerned but as I am no longer on a broadband contract with PlusNet and had no intention of going on one, so the only way I could get a change to my ageing router was by purchasing a new one.

Hence I started reading about my options and soon enough realised that an old router can be given new lease of life using DD-WRT. Equally soon-ish I also realised that the router from PlusNet - TG582n - is quite rubbish and does not play nice with any of the open source firmwares.

So I figured that if I have to just play around a bit, I might as well start with something cheaper and cheaper is what I found in the TP-Link router TL-WR841n at just £16.00. You can't get any cheaper than that in my opinion. OK, so now that we have established that I am cheap and my new router is cheap, let's move on to interesting stuff.

I had read that TP-Link router and specifically TL-WR841n plays nicely with DD-WRT but it was only after I had my new toy did I realise that these things also come in hardware version and while interwebs is filled with instructions on installing DD-WRT for upto v9, when it comes to v11 in Europe, it can be a bit tricky to proceed. There are some instructions in forums[^1] but nothing that walks one end to end hence this post.

[^1]: https://www.quora.com/Is-the-TP-Link-TL-WR841n-v11-router-supported-by-DD-WRT

<!-- more -->

## Flash router with DD-WRT firmware

There are two ways to ensure that the DD-WRT firmware gets flashed on the router:

1. **Apply Unlocked stock firmware** - This is the one I used and to use this I downloaded the modified firmware from NeDark that he has provided in a post on the OpenWRT forum [here](https://forum.openwrt.org/viewtopic.php?id=67382)

2. **Using TFTP server** - This is considered to be a safe approach because you do not have to use any modded version of stock firmware to apply it. However, if like me, you are anyway going to flash it with DD-WRT, I feel it's a bit of a pain that can be avoided as it involves setting up TFTP server and making your router to connect to this server can take some time and effort. It is explained [here](http://www.dd-wrt.com/phpBB2/viewtopic.php?t=304830&amp;sid=84c147f63f0876b055b3eb7add2a8d4e)


Right, so assuming you want to go with the first and easier approach, first you need to download the modded firmware from NeDark. He has uploaded it on his [dropbox link](https://dl.dropboxusercontent.com/u/5038754/wr841n%28EU%29_v11_150616.bin) and I have also uploaded a copy of this firmware [here](http://www.mediafire.com/file/4ap8bde3m6trcs2/wr841n%28EU%29_v11_150616.bin).

I recommend that you download all the three files from my folder on Mediafire[^2] using the link below but if you would much rather download directly from DD-WRT, then the links for rest of the two files that I used are also in footnote references[^3][^4].

[^2]: https://www.mediafire.com/folder/q56dcdecfh3v1/Router_Firmware
[^3]: http://download1.dd-wrt.com/dd-wrtv2/downloads/betas/2016/12-15-2016-r30949/tplink_tl-wr841ndv11/factory-to-ddwrt.bin
[^4]: http://download1.dd-wrt.com/dd-wrtv2/downloads/betas/2016/12-15-2016-r30949/tplink_tl-wr841ndv11/tl-wr841nd-webflash.bin

Assuming that now you have all the three files safely downloaded to you computer we just follow the simple steps below:


1. Connect the power supply to the TP-Link router and switch it on.
2. Connect the ethernet cable in one of the yellow LAN slots of the router.
3. Switch-off the wifi on your computer and connect the other end of the ethernet cable to the ethernet port of your computer.
4. Once the ethernet connection on your laptop is established, open a browser and type `192.168.0.1` and press enter.
5. You will be presented with TP-LINK admin interface.
6. Login using the credentials username: `admin`; password: `admin`.
7. On left hand navigation locate and click on `System Tools` and then on expanded menu click on `Firmware Upgrade`
8. Now click on `Browse` button and select the file from NeDARK - `wr841n(EU)_v11_150616.bin` from your downloaded folder.
9. Click on `Upgrade` button. It will take roughly 30 to 40 seconds and router will reboot.
10. Refresh the browser screen and you will once again be presented with TP-LINK admin interface.
11. Once again login using the credentials username: `admin`; password: `admin`.
12. On left hand navigation locate and click on `System Tools` and then on expanded menu click on `Firmware Upgrade`
13. Now click on `Browse` button and select the file `factory-to-ddwrt.bin`.
14. Click on `Upgrade` button. It will take roughly 30 to 40 seconds and router will reboot.
15. Disconnect the ethernet cable from Laptop and reboot the laptop - This isn't always required but just to be safe.
16. Reconnect the ethernet cable to the laptop. Make sure that wifi is switched off on the laptop.
17. Once the ethernet connection on your laptop is established, open a browser and type `192.168.1.1` and press enter.  <-- ***Notice the different IP than what was used in step 4***.
18. If all has gone well until now you will be greeted with DD-WRT login interface and will actually be asked to change the password.
19. After providing the password, navigate to tab Administration and then sub-tab named Firmware upgrade.
20. Click on `Browse` and this time select `tl-wr841nd-webflash.bin` and Click upgrade. This will take 40 seconds or so and your router has now been liberated.


This is it for flashing TP-LINK TL-WR841N v11 router with DD-WRT. I made fiber optic broadband work with no fuss but with NEST there were some issues basically down to auto setting changing to channel 13.

## Making NEST play nice with DD-WRT
The issue was that NEST would suddenly drop internet connection and then not identify the SSID for my router. The SSID just won't appear in the list of available wireless networks.

* *NEST apparently does not like channel 13, possibly even Channel 11 and 12. Changing the channel to any of the single digit (1 - 9) works well.
* In addition giving a static IP for NEST MAC seems to have resolved any network drops whatsoever.
* Under Wireless Setting, I also changed the Beacon Interval to 211.
* Under Administration tab > Management > IP Filter Settings, I changed the TCP timeout to 1800 and UDP timeout to 3600.


## Configure router for PlusNet Fiber Optic Broadband

For configuring PlusNet fiber optic broadband, the settings I used are as below:

### **Setup > Basic Setup**

![Setup 1](../assets/images/2017/02/SetupBasicSetup_1.PNG)

![Setup 2](../assets/images/2017/02/SetupBasicSetup_2.PNG)

### **Setup > DDNS**

![Setup 3](../assets/images/2017/02/DDNS.PNG)

### **Wireless > Basic Settings**

![Wireless-Basic-Settings](../assets/images/2017/02/Wireless-Basic-Settings.PNG)

### **Wireless > Wireless Security**

![Wireless-Wireless-Security](../assets/images/2017/02/Wireless-Wireless-Security.PNG)

### **Administration > Management**

![Administration-Management](../assets/images/2017/02/Administration-Management.PNG)

### **Administration > Commands**

Add the following in the startup commands

```bash linenums="1"
## Fix lan port communication 841 v7, v9, v11 
swconfig dev eth0 set enable_vlan 1 
swconfig dev eth0 set apply
```

as shown below:

![Administration-Command](../assets/images/2017/02/Administration-Command.PNG)

Above basic setting ensures that PlusNet fiber optic broadband works perfectly fine.
