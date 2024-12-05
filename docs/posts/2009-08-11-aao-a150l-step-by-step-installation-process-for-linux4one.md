---
title: AAO A150L Step by Step Installation Process for Linux4one
slug: aao-a150l-step-by-step-installation-process-for-linux4one
draft: False
description: AAO A150L - Step by Step Installation Process for Linux4one
authors: ['ankit']
date: 
  created: 2009-08-11 22:02:00
  updated: 2009-08-11 22:02:00
comments: true
categories:
  - Linux
  - Operating System
---
Linux4one is the only Linux distro other than pre-installed Linpus that worked out of the box on my and two other Acer aspire one A150L which belonged to my friends. With the GUI same as that for Ubuntu Netbook Remix, it is a fantastic OS to have on your machine. The only downside I felt was that the icons looked little washed out compared to those on actual UNR but that is not so much of an issue. Everything pretty much worked out of the box which matters the most. I did find the splash screen at the time of start-up a little childish but again these are not major issues.

<!-- more -->

However if you would rather have a more professional look and feel, Ubuntu may be your choice. Refer to other post on step by step process for installing Ubuntu Netbook Remix but be forewarned that not everything works as well on UNR as of now, at least not for me. I am still working and finding out more on how these can work but given the fact that my knowledge of Linux is zero it can take some time. I have compiled these tutorials solely by hunting on net and felt this will be my way of giving back to community. I hope you find it useful. If you do find this useful, please don’t forget to put a comment. A thanks will be enough to keep me motivated.

Without further ado, the process is as below.

You will need:

* Two 2GB card with a USB Card Reader or a 2GB USB stick formatted to FAT32
* One 1GB card with a USB Card Reader or a 1GB USB stick formatted to FAT32
* One PC / Laptop with optical drive (DVD Drive) and windows installed as this tutorial uses a Windows based laptop.
* Ensure that you AAO is having a constant AC supply and you are not relying on battery.
* Lot of patience


## 1. Create a recovery USB for Acer Aspire One A150L: (Optional)

This should be quite straight forward. Insert the recovery DVD that came with your Acer Aspire One A150. Connect the 2GB Card / USB stick and start the process.

On different laptops this may mean pressing a different function key (F1 to F12) but generally it will be F2, F8 or F12.
So once your laptop shows the first screen after switching on, at that time press the relevant key to enter the boot set-up, now goto boot and change the order of boot to select DVD as first preference. Now press F10 to save and exit.
Your laptop will now boot using the recovery DVD and should help you create the recovery USB.

It is best to once test if the recovery USB is working or not. You can do so by now plugging your recovery DVD into AAO and starting it, press F12 and change the boot order to make USB disk the first option. If the recovery USB is created properly it will start the recovery process.
If this does not happen, you are among the unfortunate few who received a faulty DVD as I have seen many posts around these. In such situations, you will find this blogpost very handy:

* [Acer aspire one recovery dvd](http://macles.blogspot.com/2008/12/acer-aspire-one-recovery-dvd.html)

!!! site-tip "Tip"
    macles.blogspot.com has a wealth of information on how to customise Linpus Linux and everything on this site is explained very nicely so incase you want to stick to Linpus Linus, it is worth to bookmark this site.

Anyway, now one way or the other once your recovery USB is ready, we have minimised the risk of not being able to restore to factory conditions in case you do not like the end result of what we have set out to achieve.

## 2. Update BIOS Version to latest V.3309 (Optional)
You will be able to download the latest BIOS V.3309 from ACER website. The ftp link to the site is [ftp://ftp.acer-euro.com/netbook/aspire_one_110/bios/](ftp://ftp.acer-euro.com/netbook/aspire_one_110/bios/) and http link is [http://support.acer-euro.com/drivers/notebook/as_one_150.html](http://support.acer-euro.com/drivers/notebook/as_one_150.html)
Once you have downloaded the latest version, you will need to make a bootable USB. I used Unetbootin which will be used later on for creating installatioon USB for Linux4one as well so you will need to now download it from here.
After downloading, connect your 1 GB Card / USB stick and run the unetbootin-windows-357.exe file and select the screen as shown below:
With this setup achieved, click OK. Once this is completed, extract all the files from BIOS zip file into the root of USB Drive. Remember it is important to have it in Root.
Now connect this USB drive to your Acer Aspire One, reboot it and press F12 to select the bootable device.System will show an error message around missing CD ROm. Ignore it. The AAO150 screen will now show A prompt A>.
Type C: in front of A> and press enter. This should change your drive to C>. Now type 3309.BAT.
This should start the flashing of BIOS to V.3309. Once completed AAO150 will reboot.
This is it. Your BIOS should now be updated to latest version.

## 3. Create a installation USB for Linux4one v1.1:
While the latest version of Linux4one is 1.5 and is available for download I was unable to make a successful installation USB from available iso. Therefore, I downloaded the V1.1 from this link:

[http://downloads.quellicheilpc.com/linux4one/1.1/index.html](http://downloads.quellicheilpc.com/linux4one/1.1/index.html)
I don't know how long this version will be hosted there so I will at a later point in time try and upload this iso to some other filehost as well.
Once you have downloaded the iso, plug your 2GB card / USB and start Unetbootin.
Select the Disk image radio button as shown in figure and select the path for linux4one iso image that you have downloaded.Select the USB Drive and click OK.
This will take some time but once done it will ask for a restart. Do NOT restart and cancel it.

Your installation USB is now ready.

## 4. Install Linux4one
[Official Guide](http://www.linux4one.it/foru/index.php?topic=163.0)
Now plug the Installation USB made above and plug it into your AAO150 and boot it. Press F12 and select the boot device.
Once the system starts booting throgh USB you will be presented with the options, select Option 'Install Linux4One'.
Now the only place which turns out confusing could be when during installation it asks for partitioning. I did not want dual boot so I picked up option 2 which installs on whole hard drive.If you are not a power user, I don't recommend having dual boot for AAO150 but that has to be your call.
Right, this will ensure that your Linux4one V1.1 is now installed. At this stage, you will reboot, configure location keyboard etc etc and restart once again.

Check that all is working as expected so far. Only thing that I found not responding well was microphone. It was not working for Skype and hence the next step.

## 5. Download update script for Linux4one v1.5
[Official Guide](http://www.linux4one.it/forum/index.php?topic=1194.0)
Download the script from here onto your AAO150L using mozilla browser.
Now goto Accessories and click on 'Terminal'. As mozilla downloads directly to 'Desktop' directory you will need to change your directore accordingly. The easiest way will be to click on the 'Desktop' link in right hand side navigator on your main screen. This will open the browser, now note the path to Desktop. In my case it was /home/Ankit/Desktop/ so I gave the following commands:

```bash linenums="1"
cd /home/Ankit/Desktop/
tar -xjvf linux4one-1.5.tar.bz2
cd linux4one-1.5
sudo ./aggiornamento.sh

```

After this it will start installing and ask several questions that you just type Y and press enter.
At one point it will also ask do you want to uninstall mozilla and you answer Y as anyway we will install it again in next step.
Right now with V1.5 the browser provided is IceCat which is same as mozilla anyway.
This will take about good 15 to 20 minutes but at the end you would have got latest version of Linux4one installed.

## 6. Install Mozilla (Optional):
With Linux4one installed, more than half of the work is already done but with last step mozilla was uninstalled and if you are used to Mozilla and would want to install it back it is quite straight forward. Just goto Administration and select Synaptic Package Manager. It will then ask you to enter your password to perform administrative tasks. You must now enter the password that you gave during installation.
It will now open a window. In Search field enter 'mozilla' and it will show several options listed. If you scroll you will find an entry 'firefox' under package. When you select that you can read the description that will be something like 'Safe and easy web browser from Mozilla'. Select the checkbox next to this entry and click 'Mark for Installation'. It will show you dependencies, just say yes to everything and then it will download and install Mozilla Browser for you.

## 7. Install and configure Skype
Goto www.skype.com and download the skype version for Ubuntu 7.04 - 8.04. Mozilla browser will download it to Desktop folder. Now once the download is complete right click on the downloaded file and click on 'Open with 'GDebi Package Installer'. You will be asked for password, enter the password you gave during installation of Linux4one. After that Skype installation will begin. There will be some dialogue boxes on dependencies for which you just click Yes / OK.
Once skype is installed it will appear as an icon in your desktop under Internet. If you want it under favourite, right click the icon and select add to favourite. This can be done for all installed softwares.

Now open skype, login and at left side bottom corner click on skype settings, select Options. Now in Options select 'Video Devices' and click on Test to check that Webcam is set correct.
Next click on 'Sound Devices' and click on Make a sound Test and Make a test call. If all is configured fine you should hear a voice and a test call will be made and in test call you will be asked to speak and what you speak will be played back that you should be able to hear.

It did not work for me at first but when I selected HDA Intel (hw:Intel,0) in all three it worked. However for my friends netbook I had to do more circus and if you are not able to resolve your mic issues, it is time to move to next step.

## 8. Modify Mic settings 

!!! site-tip "Tip" "Remember"
    You need to do this only if in previous step mic did not work.

[Official Guide](http://www.linux4one.it/forum/index.php?topic=212.0)

While there is some explanation on Official guide it took me some time to figure out how to get those windows to look like they do in the screenshots there.

First goto Preferences and scroll down. You will see 'Sound' icon. Click on this and change 'Sound Playback' and 'Sound Capture' to OSS.
Next change the 'Device' to 'Realtek ALC268 (OSS Mixer)

Now close this window and click on Volume icon in right hand corner of screen and then click on Edit and select device. Then for HDA Intel (ALSA Mixer) select all options that are not selected - Capture, Capture 1, Beep, Input, Input 1. I have borrowed the image from link above to keep information at one place.
Ensure that on last tab you select 'Mic' and not 'Front Mic'. That is it. This should complete the mic settings. Now we need to check it in Skype. In official tutorial they suggest testing with recorder but that did not work for my friends AAO150 but skype did. I figure we anyway need it for skype so why bother with voice recorder at all. So over to next step then.

## 9. Test Skype
Test skype the same way we did in step 7 and see if it is working. Click on 'Sound Devices' and click on Make a sound Test and Make a test call. If all is configured fine you should hear a voice and a test call will be made and in test call you will be asked to speak and what you speak will be played back that you should be able to hear.
If this does not work try different combinations from the dropdown one should definitely work.

## 10. Extra – Install Moneydance (Optional)
OK now is one piece of software that is not used by everyone. Moneydance is a moneymanagement tool. It is a paid software that I use for managing my finances and have grown quite fond of it and dependent on it at the same time and I really wanted this installed on my netbook and it was one of the not so easy things to install but with following instructions it should be piece of cake really.

<ol>
<li>Download linux version of Moneydance from this here. Mozilla will download it into your Desktop folder.

([http://www.moneydance.com/download/2008/installers/Moneydance_linux_x86.tar.gz](http://www.moneydance.com/download/2008/installers/Moneydance_linux_x86.tar.gz))
<li>Now goto Accessories -> Terminal.
<li>Type cd /home/YourUserName/Desktop/ and press enter
<li>Type tar xfvz Moneydance_linux_x86.tar.gz and press enter
<li>It will print following kind of stuff:
</ol>

```bash linenums="1"
Moneydance/
Moneydance/.install4j/
Moneydance/.install4j/i4jruntime.jar
Moneydance/Moneydance
Moneydance/.install4j/firstrun
Moneydance/.install4j/i4jparams.conf
Moneydance/.install4j/MessagesDefault
Moneydance/.install4j/user.jar
Moneydance/appsrc.jar
Moneydance/jcommon-1.0.12.jar
Moneydance/jfreechart-1.0.9.jar
Moneydance/license.txt
Moneydance/moneydance.jar
Moneydance/moneydance_icon32.png
```

<ol start="6">
<li>Now it will present the command prompt again. Type cd Moneydance
<li>Now Type `./Moneydance`
</ol>
It will display testing JVM in /usr and then open the Monedance software.
This is it software is now installed.
Unfortunately, this does not create any icon that you can directly click every-time and can only be run by clicking on Moneydance.sh file in Moneydance folder. So to make it easy do the following.
<ol>
<li>Goto Prefrences -> Main Menu -> Favourites.
<li>Now click on 'New Item'. It will open a dialogue box 4 fields. In second field Enter 'Moneydance'.
<li>In third field click on Browse and navigate to Desktop->Moneydance->Moneydance.sh
<li>If you want to change the icon click on icon and select the one that you want.
<li>Click OK.
</ol>

This is it you are all done.
Ensure that now you restart your Acer Aspire One 150 atleast three times before you start using as I noticed that it was only after three or four restarts that everything was well settled.

## 11. That's it friends....Now Enjoy.
Please let me know if you are stuck somewhere and I might be able to help.
