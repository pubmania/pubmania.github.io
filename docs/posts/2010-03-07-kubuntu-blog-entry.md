---
title: KUBUNTU Blog Entry
slug: kubuntu-blog-entry
draft: False
description: KUBUNTU Blog Entry
authors: ['ankit']
date: 
  created: 2010-03-07 10:22:00
  updated: 2010-03-07 10:22:00
comments: false
categories:
  - Software
  - Linux
---

This is how my love for Kubuntu has started....and growing by the minute...

I was experimenting with different Linux distros and then I went ahead with Linux Mint – which is quite popular and is know as “ubuntu done right”. I liked it and started dwelling more and played around with themes and such before I figured it is becoming kind of prescriptive and thought will actually play with the a distro with KDE not too far from Ubuntu – Kubuntu and boy was I surprised with the difference … all to their own opinion but mine is KDE is one helluva beautiful thing....the stuff that is done here is simply amazing …. alright once I was done with dropping my jaw at every step I figured there is a bit of learning curve right from the word go and so before I start forgetting what all I have learnt I felt it will be safe jotting it all down and thus this post.

Right so if any of this catches your fancy, please be my guest... :smile:

<!-- more -->

## How to upgrade Ubuntu 9.10 to Kubuntu 9.10

Plenty of information on the website and better presented at the one site than other. I liked the way it was explained [here](http://www.psychocats.net/ubuntu/kde)

This site is also a good source of information in general so well worth a bookmark.

## Restoring the default panel at bottom of the screen?

Once I finished installing Kubuntu as per the instruction from above link, I started playing around and ended up deleting the panel thus learning about how to get that back. In the process I learnt important lesson on making a backup of setting as soon as you have configured system to your first level of satisfaction as if you do not take this precaution you will have to start all over again.
The steps I took were as below:

Goto Applications tab, click on Settings → Terminal and open the terminal, Type following commands:

```bash
sudo cp -R ~/.kde .kde_backup   sudo rm -rfv .kde   kquitapp plasma-desktop   sudo restart
```
This is it.

Now once the system restarts, your panel will be in place. However you will have to put all your configuration again. So to avoid that in future, repeat first two steps and next time you end up in similar situation all you need to do is give this command sudo cp -R ~/.kde_backup .kde and you should be good to go.

## Problems and Resolutions

**Problems with system audio, you-tube audio and how it all finally started working for me.**

When I opened a video on youtube, I was not getting any sound. After some googling with no results I tried this and again today after restoring panel the sound was gone and trying this made it work so I assume at-least for all Dell Inspiron 1525 this should work.
Open the voice control by clicking on volume icon in system tray and clicking on Mixer as and then unmute the “Headphone”.
After this I restarted the computer and logged into GNOME session, and played a youtube video. Sound was coming alright. I logged out from GNOME session and logged in again in KDE session and tried a video on youtube and it was working fine.

#### Change the theme and wallpaper.

To change the theme, it is quite simple. Just right click anywhere on desktop and select desktop settings, and under theme either select the available option or download from available options and install. For wallpaper also do the same thing.

#### Change the splash screen

Download the splash screen. I downloaded “Kcarbon” splash screen from [here](http://kde-look.org/index.php?xcontentmode=35x45) as it was going nicely with my desktop theme and wallpaper.

Once it was downloaded, I opened from Application Menu → Computer → System Settings → Appearance (under look and feel section) → Splash Screens to get to this screen and then click install, select location where you downloaded the tar file.

#### Change the Log-in Screen (KDM Screen)

**UPDATE**

* Open the 'System Settings' KDE application.
* Choose the 'Advanced' tab.
* Go to 'Login Manager'.
* Choose 'Theme' tab.
* Click on the 'Install new theme' button.
* Choose the compressed file and click ok.


This one was rather flaky solution. I could not find anything that could change the initial background screen where we enter user credentials and password. This is called KDM Theme as I learnt while finding out how to do it. Several searches on google talked about something called KDM Theme Manager but they are all old mails and for new KDE 4+ it comes pre-installed and I did not know what to do.
So I downloaded one of the KDM themes from [http://kde-look.org](http://kde-look.org) and unzipped it into the following location as root.

```bash
kdesudo dolphin /usr/share/kde4/apps/kdm/themes/
```

Next, I renamed the folder “oxygen-air” as “oxygen-air_old” and the downloaded and unzipped folder as “oxygen-air”.
This is it. When I restarted I had the brand new KDM Theme to my satisfaction.:)


#### Change the boot splash screen

I tried many suggestions but only after going through the whole GRUB2 entries as explained on [this link](http://ubuntuforums.org/showthread.php?t=1195275&amp;highlight=grub2), I got the result I was looking for. However, I did have to do a little bit of trial and error so I will put the steps that finally worked for me. These may also come handy if you do not want to know in depth about all GRUB 2 stuff.


* In GIMP, open the image you want to show as the background when GRUB shows choices to select which OS you want to load at start-up

* Now goto Image -> Scale and then enter height as 640, press tab.

* Now save the image as a .png file.

* in the terminal type kdesudo dolphin /usr/share/images/desktop-base

* Copy the image saved in step 3 and paste it in the desktop-base folder

* Now in the terminal type kdesudo kate /etc/grub.d/05_debian_theme

* This will open 05_debian_theme file with kate text editor.

* Go to line 16 and find the following line and edit the highlighted area, replacing it with the name of image copied into desktop-base folder in Step 5 `for i in {/boot/grub,/usr/share/images/desktop-base}/moreblue-orbit-grub.{png,tga} ; do`

* Save the file and in the terminal type:

```bash
sudo update-grub2
sudo reboot
```