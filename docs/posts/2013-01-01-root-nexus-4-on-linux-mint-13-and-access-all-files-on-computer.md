---
title: Root Nexus 4 on Linux Mint 13 and access all files on computer
slug: root-nexus-4-on-linux-mint-13-and-access-all-files-on-computer
draft: False
description: Root Nexus 4 on Linux Mint 13 and access all files on computer
authors: ['ankit']
date: 
  created: 2013-01-01 12:38:00
  updated: 2013-01-01 12:38:00
comments: true
categories:
  - Linux
  - Software
  - Troubleshooting
  - Phone
  - Android
---
## Background

Having a rooted phone and then going to one that does not have root access is like getting used to driving a luxury car but then being forced to drive a tractor. So with arrival of my shining new nexus 4 once the novelty worn of in 8 hours or so, I sat down and rooted the device. Now there are plenty of guides out there but not many specific to Linux just yet. One reason might just be the fact the Linux Users are really smart and know how to figure it out but what about users who are new ...well at least for them I am sure this post will be useful and while we are at it, I felt I will install the touch version of CWM...

<!-- more -->

## Pre-requisite

For purpose of this tutorial, I will assume that adb set-up is in place using steps explained in my last post specifically up to Step  It is totally worth doing it before you proceed but if you would prefer a shorter route, please refer some guide on how to install just adb. Though I would not recommend any other approach. (Not because they will not work but because this approach will ensure clean system and something I have tested 4 times already to work and if you will follow this post, it makes sense to do it the way I did)

1. Clockwork Recovery Mod (Touch Version)
2. Super User App
3. Fastboot

!!! danger
    This process will wipe out all user data and apps. Appropriate back-ups should be taken and restoring those is beyond the scope of this post.

Items 1 and 2 can be downloaded directly from [http://www.clockworkmod.com/rommanager](http://www.clockworkmod.com/rommanager) and [http://download.chainfire.eu/282/SuperSU/](http://download.chainfire.eu/282/SuperSU/) or as before I have uploaded them in mediafire and can be downloaded from this [link](http://www.mediafire.com/?ylp382ompa4jr).

I downloaded fastboot few months back from xda using this link and am not sure if it is still there or not so I have uploaded it to mediafire as well.

![Fig-1](../assets/images/2016/07/20130101_Fig_1.png)

## Step 1: Prepare Nexus 4 and Linux Mint 13

1. Check if fastboot is already there in the the /android-sdks/platform-tools directory. If yes skip the next step.

2. Extract the fastboot from downloaded zip file and place it in the /android-sdks/platform-tools directory if it is not already there and make it executable (Right Click, Select properties, Go To permissions tab and select the checkbox in front of 'Execute')

3. Copy the downloaded Clock Work Mod file (recovery-clockwork-touch-6.0.2.3-mako.img) in the /android-sdks/platform-tools directory.

4. Activate debug mode in nexus 4 - to do this go to settings > About Phone and then click 7 to 8 times on 'Build Number'. This will activate developer mode.

5. Now click back and got to {} Developer Options and Click the checkbox against USB debugging.

6. Set up udev on linux mint:
   
    1. Assuming that you have followed last post you would already have a `51-android.rules` file created.
   
    2. Open the file with Gedit using following command
   
        ```bash
        sudo gedit /etc/udev/rules.d/51-android.rules
        ```
    3. Add following lines:
   
        ```bash
        #LG - Nexus 4
        SUBSYSTEM=='usb', ATTR{idVendor}=='1004', MODE='0666'
        SUBSYSTEMS=='usb', ATTRS{idVendor}=='18d1', ATTRS{idProduct}=='4ee1', MODE='0660', OWNER='ankit' #Normal nexus 4
        SUBSYSTEMS=='usb', ATTRS{idVendor}=='18d1', ATTRS{idProduct}=='4ee2', MODE='0660', OWNER='ankit' #Debug &amp; Recovery nexus 4
        SUBSYSTEMS=='usb', ATTRS{idVendor}=='18d1', ATTRS{idProduct}=='4ee0', MODE='0660', OWNER='ankit' #Fastboot nexus 4
        ```

      I got the Vendor ID and Product ID by connecting the phone in different states (USB debug checked, unchecked and also after the phone was connected and rebooted into bootloader using command 'adb reboot bootloader') as per the guidance given here.
    
    4. Now Save the file, then chmod to all read using following command:
   
        ```bash
        sudo chmod +x /etc/udev/rules.d/51-android.rules 
        ```

## Step 2: Unblock bootloader for Nexus 4

1. Plug your phone into the computer and type the following command in terminal:
   
    ```bash
    adb reboot bootloader
    ```

2. Once Nexus 4 has rebooted in recovery mode, type the following command in terminal:
   
    ```bash
    fastboot oem unlock
    ```
  
  If terminal displays the message 'waiting for device' 51-android.rules file is not set correctly and you might need to check vendor ID and product id using `lsusb` command in different modes and update it with appropriate data.

1. Phone will display a long message and ask for confirmation to unlock bootloader. Select 'Yes' by using the volume keys and use power to select it.

 Now, using volume keys navigate to 'Recovery Mode' and select it using 'Power' key.

 After a while Android with blue progress bar should appear and phone should reboot but if it does not and instead shows a screen with 'Android' on it's back with an exclamation mark on it's tummy, don't panic. Just press 'Power' and 'Volume Up' till it shows recovery menu and then select 'reboot'.

The phone is now bootloader unlocked.

## Step 3: Root Nexus 4

OK now when the phone boots, it will be fresh with factory reset, no data or apps whatsoever other than those that are there by default and when the phone boots, it will ask all details like selecting country etc. Just enter quickly without bothering to enter gmail, wifi etc. Once done:

1. Install mtpfs from synaptics.

2. Plug the phone to computer.

3. Type the following commands:
   
    ```bash linenums="1"
    sudo mkdir /media/nexus4 
    sudo chmod 755 /media/nexus4 
    ```
    
4. Now mount the nexus 4 using following command so we can transfer files:
   
    ```bash
    sudo mtpfs -o allow_other /media/nexus4 
    ```

5. Copy the downloaded file 'CWM-SuperSU-v0.98.zip' on Nexus 

6. Type the following command to unmount nexus 4:
   
    ```bash
    sudo umount /media/nexus4
    ```

7. Reactivate the debug mode using Step 1.4 and Step 1.5 above.

8.  On terminal type the command:
   
    ```bash linenums="1"
    adb reboot bootloader 
    fastboot flash recovery /android-sdks/platform-tools/recovery-clockwork-touch-6.0.2.3-mako.img
    ```

    !!! site-tip "Tip"
        Make sure in above command you replace PATH_TO with the actual path to the file. An easy way can be to right click on "recovery-clockwork-touch-6.0.2.3-mako.img" file and click on properties thene select the path and paste in this command.
    
    ![Fig-2](../assets/images/2016/07/20130101_Fig_2.png)
    
9. Once completed, on the phone navigate to 'Recover Mode' using volume keys and select using power key.

10. The new recovery menu will be presented. Select 'install zip from sd card' and 'choose zip from sd card.' and select the file we had put in step 3.5 - 'CWM-SuperSU-v0.98.zip'.

11. Once done, go back to reboot and 'Reboot' the phone.

At this point your phone is rooted,however, you will get a message suggesting the recovery will not be permanent or something to that effect which is fine if you aren't bothered about it but if you would rather want to keep this CWM we need to move to next step.

## Step 4: Make Clockwork Mod Permanent

1. On your phone install ES File Explorer.

2. Select Settings.
   
    ![Fig-3](../assets/images/2016/07/20130101_Fig_3.png)

3. Select 'Root Settings'.
   
    ![Fig-4](../assets/images/2016/07/20130101_Fig_4.png)

4. Select all checkboxes. You will be asked for superuser access, say Yes.
   
    ![Fig-5](../assets/images/2016/07/20130101_Fig_5.png)
 
5. Now go back to main screen of ES File Explorer and select the third tab with an icon of Folder with up arrow and text Up. This should bring you to root.

6. Now using ES File Explorer navigate on your phone to `/system/etc`, find the file named `install-recovery.sh` and rename it to `install-recovery.bak`

7. Repeat Steps 3.7 to 3.11.

Now your clockwork mod is permanent.

## Step 5: Mount and Un-Mount Nexus 4 to access files from Linux Mint

Now, with the steps 3.1 to 3.6 we have laid the foundation for being able to connect Nexus 4 and transfer files using USB. Something earlier was possible using USB Mass storage mode but is not present jelly bean onwards.
The commands in 3.4 and 3.6 are key to achieve this but rather than remembering these and typing each time, I have made a menu entries for each of these (Mount Nexus 4, Unmount Nexus 4) and after connecting phone via USB, I simply click on these, system asks root password and then connects nexus 4 as mass storage as shown below.

![Fig-3](../assets/images/2016/07/20130101_Fig_6.png)

In order to get these you will follow the steps below:

1. Right Click on Menu and select 'edit Menu'.

2. Now click on 'New Menu' and Enter a menu entry 'Phone'.

3. Select the checkbox next to the new menu entry 'Phone' in middle pane.

4. Select new menu entry 'Phone' in left pane.

5. Click on 'New Item' in right Pane and in the dialogue box fill the fields as below and save:
   
    ```yaml
    Type:       Application in terminal
    Name:       Mount Nexus 4
    Command:    sudo mtpfs -o allow_other /media/nexus4
    ```

6. Again click on 'New Item' in right Pane and in the dialogue box fill the fields as below and save:
   
    ```yaml
    Type:            Application in terminal
    Name:            Unmount Nexus 4
    Command:         sudo umount /media/nexus4
    ```

7. Make sure checkbox next to these new items is ticked. Save and Close.

That's it !!! All Done.

Hope some will find this post useful.
