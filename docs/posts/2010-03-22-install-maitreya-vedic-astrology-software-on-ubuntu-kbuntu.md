---
title: Install Maitreya - Vedic Astrology Software on Ubuntu / Kbuntu
slug: install-maitreya-vedic-astrology-software-on-ubuntu-kbuntu
draft: False
description: Install Maitreya - Vedic Astrology Software on Ubuntu / Kbuntu
authors: ['ankit']
date: 
  created: 2010-03-22 13:38:00
  updated: 2010-03-22 13:38:00
comments: false
comments_archived: true
categories:
  - Linux
  - Software
---

First I must thank the Maitreya developers for coming up with such a wonderful Vedic Astrology software that works on Linux. I am not aware of any other vedic astrology software that works on Linux.

Next I have to say that the install instructions on the site (and in the tarball) are not written with a newbie in mind and I had to struggle a bit before I could get it to work. The compiling of source code is really similar for I guess all source codes in general on linux and in particular in Ubuntu / Kubuntu but thing is when you are new to the platform and probably have almost all required software in repositories you rarely come across a situation where you need to compile from a source code to install your favourite software. Anyway so without wasting time in chit-chat, below is the step by step installation of Maitreya 6 on Ubuntu / Kubuntu.

<!-- more -->

## Download Maitreya 6 tarball 

From your browser goto [http://maitreya.svn.sourceforge.net/viewvc/maitreya/](http://maitreya.svn.sourceforge.net/viewvc/maitreya/) and click on the link 'Download GNU tarball'. This will download the maitreya.tar.gz file on your system.

## Prepare the system for installing

I used the instructions from ubuntu help documentation that can be found here. However, I have documented the step that I used in sequence to achieve the objective.


1. Open the terminal.

1. Type - sudo apt-get install build-essential checkinstall

1. You will be asked for the password. Enter it.

1. Once system completes the above instruction and is ready to take next instruction then Type: sudo apt-get install cvs subversion git-core mercurial

1. Next type: `sudo chown yourusername /usr/local/src`

    !!! site-tip "Tip"
        Please note that here you need to put the your user name so don't just copy paste. So if say user name is "ankit" , you will type sudo chown ankit /usr/local/src

1. Next Type: `sudo chmod u+rwx /usr/local/src`


Now the system is prepared for installing.


## Install wxWidgets 2.8 Dependencies 

As mentioned on Maitreya site, the software depends on wxWidgets 2.8 and corresponding packages must be installed. On the site itself is given the code that needs to copied onto the terminal to achieve this.


1. Either from the site or from below select the text.

    ```bash
    sudo apt-get install libwxbase2.8-0 libwxbase2.8-dev libwxgtk2.8-0 libwxgtk2.8-dev wx2.8-headers wx2.8-i18n
    ```

2. Press ++ctrl+c++
   
3. Goto Terminal window and press ++ctrl+shift+v++ or click on Edit from top menu and select Paste.

4. Press ++enter++.

5. You may have to provide password.

6. This should now install wxWidgets 2.8


Over to next step.


## Configure and Build 

There are few things that should be done before we start to configure the downloaded source code.

1. First goto the folder where maitreya.tar.gz file was downloaded in Step 1.

2. Now right click and select 'Extract Archive To'.

3. Select the location /usr/local/src

4. This will extract a folder named maiterya into the location /usr/local/src


The content downloaded may change in future but at the time of writing this article it has two folders maitreya5 and maitreya6. All next steps will assume that folders name maitreya6 is present in your download but if not you will just have to replace with whatever folder is inside the extracted maitreya folder.

1. Goto your termincal window and type: cd /usr/local/src/maitreya/maitreya6/trunk

2. Now type `./configure`.
   
3. If it gives some bash error like permission denied or file does not exist etc try `sh ./confgure`. This is what worked from me though everywhere instructions were to just use without sh.
   
4. It will take a bit of time but it should complete without any error and end with some instructions about using 'make'.
   
5. Now type `make` on terminal.
   
6. It should be done with no errors if all steps were followed correctly so far.


Over to next step.



## Install 

Again there were options around using sudo make install but the ubuntu help I have referred to (link above), suggested that checkinstall is better and it also creates a .deb file and I like the idea so that next time if I have to reinstall I don't need to do all this circus so I used the following and would recommend the same.


1. So in terminal window type `sudo checkinstall`.

2. When you run it it will ask some questions like doc-pak is not there, do you want to create?(Y) just type Y.

1. Then it shows some options and asks if you want to edit. I typed 2 to edit name and entered Maitreya.

1. It threw a warning that maitreya 6-1_i386 is not complaint with debian standard or something to that effect and I just pressed enter.

1. After this it was all fine and finally a message was shown telling a debian package has been created and to remove use dpkg ...
   
The software should now be installed and you can test it by clicking the file named Maitreya6 at Location - /usr/local/src/maitreya/maitreya6/trunk/src/gui. However if you want to access it easily from desktop there is just one more step.

## Create a desktop icon 

To create a desktop icon goto the folder `/usr/local/src/maitreya/maitreya6/trunk` and copy the file `maitreya6.desktop` and paste in on desktop.

This is it you have now installed the Maitreya software !!!

As I plan to move away from disqus comment system, I am just including the screenshots of comments just so any information shared by or to the readers is retained.

![Image title](../assets/images/disqus_comments/install-maitreya-vedic-astrology-software-on-ubuntu-kbuntu-dark.png#only-dark)
![Image title](../assets/images/disqus_comments/install-maitreya-vedic-astrology-software-on-ubuntu-kbuntu-light.png#onlylight)