---
title: OpenVPN on Linux Mint to access US sites
slug: openvpn-on-linux-mint-to-access-us
draft: False
description: OpenVPN on Linux Mint to access US sites
authors: ['ankit']
date: 
  created: 2011-11-06 10:26:00
  updated: 2011-11-06 10:26:00
comments: true
categories:
  - Linux
  - Software
  - Troubleshooting
  - Network Setup
  - Server Setup
---
<hr>
!!! site-abstract "UPDATE"
    LOOKS LIKE HOSTIZZLE IS NOT WORKING ANYMORE. THE STEPS IN THIS GUIDE WILL STILL BE RELEVANT FOR SETTING UP OPEN VPN, JUST THAT YOU WILL NEED TO FIND SOME OTHER PROVIDER.**
<hr>

<!-- more -->

I received a Google Music invite and as it is only available in US, I used OpenVPN on linux. Now this is a handy little trick to bypass the geographical constraints that are placed to block services on net. All this without opening the windows box to install dodgy looking services of Hotspot Shield which anyway does not work on Linux.

Ever come across 'This video is not available in your country.' on you tube or ever wanted to access Hulu only to be greeted by a similar message. Well then, if yes is your answer, openVPN is the solution to such sorrows.

It also comes with some other benefits such as anonymous browsing but then highlighting benefits of VPN is not exactly the aim of this post. The aim of this post is:

To configure a free VPN service that allows you to bypass country restrictions for US based sites. Keyword - US. As the site I am going to use only gives a US IP. Ofcourse if we remove the word free it opens up a range of possibilities which I will leave the readers to explore. :smile:

Alright, let's get on with the business:

## Step 1: Install OpenVPN

Open Synaptics and type OpenVPN in 'Quick Search'. Then select all the packages marked green in screenshot below but not in your synaptic window and click on 'Apply'.

![20111106_Fig_1.png](../assets/images/2016/07/20111106_Fig_1.png)

Then type 'pptp' in 'Quick Search' and select all the packages marked green in the screenshot below but not in your synaptic window and click on 'Apply'.

![20111106_Fig_2](../assets/images/2016/07/20111106_Fig_2.png)

## Step 2: Register with the free OpenVPN provider 'Hostizzle'

Open the website [http://hostizzle.com/](http://hostizzle.com/) and follow the screenshots below:

[20111106_Fig_3](../assets/images/2016/07/20111106_Fig_3.png)

![image](../assets/images/2016/07/20111106_Fig_4.png)

![image](../assets/images/2016/07/20111106_Fig_5.png)

## Step 3: Set-up OpenVPN on Linux Mint

Open Terminal and type the following command:

```bash
gksudo nautilus /etc/openvpn/
```

You will be asked for root password and the File Explorer will be opened with root access. This is necessary as /opt directory only gives write access to root and as you wil see next step requires some files to be extracted in this directory. This extracted directory will be some long number.

!!! site-tip "Tip"
    Please be extremely careful now, as you are accessing your file system as root.</div>

Now copy the zip file downloaded from Hostizzle in Step 2, to this directory and extract it here.

## Step 4: Configure network manager

Open the Network Manager as shown in following screenshot:

Menu > All Applications > Preferences > Network Connections

![image](../assets/images/2016/07/20111106_Fig_6.png)

This will open the following window:

![image](../assets/images/2016/07/20111106_Fig_7.png)

Now click on VPN tab and then on Import button as shown in next screenshot.

It will open the file selection box. Navigate to File System/etc/openvpn/ and now open the long numbered directory that was extracted in Step 3(a) as shown in next figure.

![image](../assets/images/2016/07/20111106_Fig_8.png)

Here select the .ovpn file and click Open. Following dialogue box will open.

![Fig-9](../assets/images/2016/07/20111106_Fig_9.png)

Just accept defaults and click 'Apply'.

Then Click on 'Close' on Network Connections window.

![image](../assets/images/2016/07/20111106_Fig_10.png)

## Step 5: Connect to the OpenVPN

Restart your system and once it is connected to your home WiFi, click on Network Indicator in the panel and select 'VPN Connections'.

![image](../assets/images/2016/07/20111106_Fig_11.png)

This will list all available VPN connections as can be seen in the screenshot. Select the VPN name with big number which is what we have just configured.

![image](../assets/images/2016/07/20111106_Fig_12.png)

Once done if everything was done correctly, it should connect to VPN and you should be able to browse with an american IP address.
Some key points to remember:

Free service of Hostizzle is quite generous compared to so many other options I explored, yet it is worth knowing the restrictions:

1. 100GB of bandwidth each month.
2. US IP
3. Limited to one month. You need to download new Keys and configure VPN using steps below each month.

Now considering that it takes less than 5 minutes to complete these steps and that it is a free alternative with a generous bandwidth, I would say it is all worth it.

Ofcourse, if you are not happy with the restrictions, there are some paid alternatives that can be implemented for as low as $4 per month from various providers, Hostizzle included. Go shopping !!!
