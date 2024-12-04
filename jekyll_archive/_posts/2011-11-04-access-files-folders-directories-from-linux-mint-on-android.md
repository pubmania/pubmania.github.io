---
title: "Access (files / folders) Directories from Linux Mint on Android"
slug: "access-files-folders-directories-from-linux-mint-on-android"
toc: false
classes: "wide"
date: 2011-11-04T11:03:00
draft: false
description: Access (files / folders) Directories from Linux Mint on Android
last_modified_at: 2011-11-04T11:03:00
---
<img src="../assets/images/2016/07/20111104_Fig_1.png" alt="Fig-1" style="width:20%;height:40%;float:left;margin:0.4em">
Let me clear the air before anyone mentions. Yes, I know it's directories and not folders and yes I know many still call these folders and this may encourage the wrong usage but my aim is to help not educate but hopefully making this the first line in post will have some educational effect :).
Right, so to start with, presented below is the problem statement:
We want to share particular folder on our home WiFi network such that all members of the family can access it using their gadget - laptop / smartphone / netbook etc. Now like a true project manager, I will scope it down by making an assumption that any gadget that runs a variant of linux - Android included. It's not to say that the solution will not work on iOS or Windows, it's to say that these operating systems are not covered but might as well work with right application downloaded.However the solution offered will make no such claims...:p. Having said that, I will actually only be covering Android in this article as for Linux on desktop, it is fairly straight forward by going through &quot;Network&quot; places.
Ok now to the exciting stuff:
<h3 id="step1decidewhichdirectoryfolderyouwanttoshare">Step 1: Decide which Directory (Folder) you want to share.</h3>
For purpose of this demonstration, let's create a new folder called &quot;DemoShare&quot;.
<h3 id="step2decidewhetheryouwantittobeaccessedbyspecificusersoranyoneandeveryoneconnectedtoyourhomenetwork">Step 2: Decide whether you want it to be accessed by specific users or anyone and everyone connected to your home network</h3>
a) If you would want the shared directory (folder) to be password protected go through all steps below.<br>
b) If you would want to give guest access to all users, skip to Step 4.
<h3 id="step3">Step 3:</h3>
a) Create new User(s) -
Let's create a new user - androshare. This can be done by following the images below:
<img src="../assets/images/2016/07/20111104_Fig_2.png" alt="Fig-2" style="width:40%;height:40%;">
<img src="../assets/images/2016/07/20111104_Fig_3.png" alt="Fig-3" style="width:40%;height:40%;">
<img src="../assets/images/2016/07/20111104_Fig_4.png" alt="Fig-4" style="width:40%;height:40%;">
<img src="../assets/images/2016/07/20111104_Fig_5.png" alt="Fig-5" style="width:40%;height:40%;">
<img src="../assets/images/2016/07/20111104_Fig_6.png" alt="Fig-6" style="width:40%;height:40%;">
<img src="../assets/images/2016/07/20111104_Fig_7.png" alt="Fig-7" style="width:40%;height:40%;">
<img src="../assets/images/2016/07/20111104_Fig_8.png" alt="Fig-8" style="width:40%;height:40%;">
Obviously you are free to be creative with the username. Just replace <code>androshare</code> with your username in subsequent commands.
b) Create samba username(s)/password(s)<br>
Open the terminal and type the following command:<br>
<code>sudo smbpasswd -a androshare</code>. You will be asked for the root password and then new password for the username.
Once you type in new password, you will be asked to retype the new password. Again as shown in image.<br>
<img src="../assets/images/2016/07/20111104_Fig_9.png" alt="" loading="lazy">
c) Restart Samba
Open the terminal and type the following command:
<code>sudo service smbd restart</code>
<h3 id="step4updatesharepropertiesofthedirectoryiestobeshared">Step 4: Update Share Properties of the Directory(ies) to be shared</h3>
<table>
<tr><td><img src="../assets/images/2016/07/20111104_Fig_10.png" alt="Fig-10" style="width:40%;height:40%;float:right;">Goto the folder "DemoShare" created in Step 1, right click on the folder and select properties. On the properties dialogue box click on Share tab. Click on share the folder checkbox.
</td><tr>
<tr><td><img src="../assets/images/2016/07/20111104_Fig_11.png" alt="Fig-11" style="width:40%;height:40%;float:left;">For scenario (a) of Step 2 click on checkbox - "Allow users to create and delete files in this folder" as shown in the figure below and click on Create Share.</td></tr>
<tr><td>
<img src="../assets/images/2016/07/20111104_Fig_12.png" alt="Fig-12" style="width:40%;height:40%;float:right;">
For scenario (b) of Step 2, mark the "Guest access" Checkbox too as shown in next figure before clicking the Create Share button.<td></tr>
<tr><td><img src="../assets/images/2016/07/20111104_Fig_13.png" alt="Fig-11" style="width:40%;height:40%;float:left;">After the Create Share button is clicked following dialogue will appear. Select "Add the permissions automatically"<td></tr>
</table>
The folder icon will then change to show a share flag as shown below.
<img src="../assets/images/2016/07/20111104_Fig_14.png" alt="" loading="lazy">
<h3 id="step5downloadandinstallthefileexplorerapp">Step 5: Download and install the file explorer app</h3>
ES File explorer is what I use and recommend. It can be downloaded from market here - <a href="https://market.android.com/details?id=com.estrongs.android.pop">https://market.android.com/details?id=com.estrongs.android.pop</a><br>
<img src="../assets/images/2016/07/20111104_Fig_15.png" alt="" loading="lazy">
<h3 id="step6configuretheapptoaccesstheshareddirectory">Step 6: Configure the app to access the shared directory</h3>
On your computer, open the terminal and type:
<code>ifconfig</code>
In the resulting information, locate wlan0 (last entry) and under that in second line you will find something like &quot;inet addr: 192.168.1.74&quot;, Note this down.
Open the app and goto LAN tab.<br>
<img src="../assets/images/2016/07/20111104_Fig_16.png" alt="Fig-16" style="width:20%;height:40%;">
Press the menu button and click on &quot;New&quot;.
Now click on &quot;Server&quot;. This will open the &quot;New/Edit Samba Server Screen&quot;.
<img src="../assets/images/2016/07/20111104_Fig_17.png" alt="Fig-17" style="width:20%;height:40%;float:left;">
Complete it as shown with following information:
<pre class="language-unknown"><code>
| Field     | Scenario A            | Scenario B            |
|-----------|-----------------------|-----------------------|
| Server    | IP Address from above | IP Address from above |
| Username  | Androshare            | BLANK                 |
| Password  | As given in Step 3a   | BLANK                 |
| Anonymous | BLANK                 | Select the checkbox   |</code></pre>
Click OK.
Now if you click on the IP address, it should show the shared directory. As you can see in the screenshot at the beginning of this post, I have already shared my Calibre Library and it does make life really simple. I can download files and e-books without actually going to my laptop.
That is all there is to it.
Hope you find it useful.
