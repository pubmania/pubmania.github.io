---
title: "Flash Samsung Galaxy S (GT -I9000) with Cyanogenmod 9 on Linux"
slug: "flash-samsung-galaxy-s-gt-i9000-with-cyanogenmod-9-on-linux"
toc: false
classes: "wide"
date: 2012-10-15T22:20:00
draft: false
description: Flash Samsung Galaxy S (GT -I9000) with Cyanogenmod 9 on Linux
last_modified_at: 2012-10-15T22:20:00
---
I had an old Samsung Galaxy S which was still on stock ROM hence it only ever got to gingerbread and then Samsung just decided not to upgrade and I upgraded the phone so this little gadget was till yesterday destined to live with the old gingerbread.
Then yesterday, I just decided to play around with it and started reading so I know what are my options. Now wiki guide on Cyanogenmod site is quite nicely written but there were one or two steps here and there which had me confused for a little while so here is my usual step-by-step guide on how to go about it.
<strong>UPDATE: Uploaded all the files to mediafire as requested in one of the comments below. These can be downloaded from following link:</strong>
<a href="http://www.mediafire.com/?ims1bxp6b8yp8">http://www.mediafire.com/?ims1bxp6b8yp8</a>
<strong>Step 1:</strong>
a) Download Heimdall Suite 1.3.2 Command-line Binary for your OS from here ; for Linux Mint you can use the Ubuntu link and install the downloaded &quot;heimdall_1.3.2_i386.deb&quot; file.
b) Download hardcore's Kernel with the ClockworkMod Recovery 2.5 here. This will download a file named &quot;hardcore-speedmod.tar&quot;. I am assuming that it will be saved in &quot;Downloads&quot; directory but if you have a different location, please replace &quot;Downloads&quot; with appropriate directory.
<strong>Step 2:</strong> Just to avoid any confusion, make a new directory in Downloads and name it &quot;Galaxy_S&quot;.
<strong>Step 3:</strong> Copy the downloaded file (from 1-b) &quot;hardcore-speedmod.tar&quot; into the new directory &quot;Galaxy_S&quot;
<strong>Step 4:</strong> Now right-click on &quot;hardcore-speedmod.tar&quot; and select extract here as shown. This will extract the file zImage into the directory Galaxy_S.
<img src="../assets/images/2016/07/20121012_Fig_1.png" alt="Fig-1" style="width:50%;height:40%;">
<strong>Step 5:</strong> Connect microUSB cable to your computer but not the phone.
<strong>Step 6:</strong> Power off the Samsung Galaxy S.
<strong>Step 7:</strong> Connect the microUSB cable to Samsung Galaxy S.
<strong>Step 8:</strong> Boot the phone in download mode by holding &quot;HOME+Volume Down+POWER&quot; buttons.
<strong>Step 9:</strong> Open the terminal and type following commands:
<pre class="language-bash line-numbers"><code>cd Downloads/Galaxy_S
sudo heimdall flash --kernel zImage</code></pre>
A blue transfer bar will appear on the phone showing the kernel being transferred. Once completed, the device will reboot automatically.
<strong>Step 10:</strong> Disconnect the phone from microUSB cable, switch it on and connect to your computer using the microUSB cable as mass storage.
<div class="boxed">You may need to go to phone settings and change USB connection settings to be able to connect the phone as mass storage.</div>
<strong>Step 11:</strong> Download the latest Cyanogenmod ROM from <a href="http://wiki.cyanogenmod.com/wiki/Samsung_Galaxy_S">here</a>.
<img src="../assets/images/2016/07/20121012_Fig_2.png" alt="Fig-2" style="width:75%;height:40%;">
<strong>Step 12:</strong> Follow this <a href="http://wiki.cyanogenmod.com/wiki/Latest_Version#Google_Apps">link</a> to land at above page and then download the latest version of Google Apps.
<img src="../assets/images/2016/07/20121012_Fig_3.png" alt="Fig-3" style="width:75%;height:40%;">
<strong>Step 13:</strong> You will now have following two zip files in your &quot;Downloads&quot; directory:
<pre><code>          a) cm-9.1.0-galaxysmtd.zip from Step 11.
          b) gapps-ics-20120317-signed.zip from Step 12
</code></pre>
Copy these two files into the root directory of the Samsung Galaxy S.
<strong>Step 14:</strong> Now, disconnect the phone from microUSB and switch it off.
<strong>Step 15:</strong> Boot the phone in Recovery mode by holding &quot;HOME+Volume Up+POWER&quot; buttons. You will be presented with various recovery options such as reboot phone etc.
<strong>Step 17:</strong> Now use the Volume Up and Volume Down buttons to navigate options. Use Volume Down button to reach the option to Wipe data/factory reset and press POWER button to select this option.
<strong>Step 18:</strong> Once done, Use Volume Down button to reach the option to wipe cache partition and press POWER button to select this option.
<strong>Step 19:</strong> Next select &quot;Install zip from sdcard&quot; which will present another set of options where you should select &quot;Choose zip from sdcard&quot;
<strong>Step 20:</strong> Now you will see the list of files on your SD Cards root directory. Select the file &quot;cm-9.1.0-galaxysmtd.zip&quot; and on following screen of options select &quot;Yes&quot;.
<strong>Step 21:</strong> Once installed, select +++++Go Back+++++ and again select &quot;Install zip from sdcard&quot; which will present another set of options where you should select &quot;Choose zip from sdcard&quot;
<strong>Step 22:</strong> This time select the file &quot;gapps-ics-20120317-signed.zip&quot; and on following screen of options select &quot;Yes&quot;.
<strong>Step 23:</strong> Once installed, select +++++Go Back+++++ to return to main menu.
<strong>Step 24:</strong> On main menu select &quot;Reboot System now&quot; option.
<strong>Step 25:</strong> If all has gone as above, your phone will restart and after a while you will see cyanogenmod flash screen. This screen will be there for a good 1 to 2 minutes. Don't panic and dont mess. Let system do it's work and in some time you would have given a fresh lease of life to your old dieing Samsung Galaxy S.
