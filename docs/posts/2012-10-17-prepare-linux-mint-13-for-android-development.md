---
title: Prepare Linux Mint 13 for Android development
slug: prepare-linux-mint-13-for-android-development
draft: False
description: Prepare Linux Mint 13 for Android development
authors: ['ankit']
date: 
  created: 2012-10-17 23:12:00
  updated: 2012-10-17 23:12:00
comments: true
categories:
  - Linux
  - Software
  - Troubleshooting
  - Development
---

## Background

Few weeks back I updated to the latest Linux Mint offering 'Maya' a.k.a Linux Mint 13. Now this is a LTS (Long Term Support) version and I wanted to be in a position to install everything right just so I can keep it for a longer duration and hence have been taking my time configuring stuff.

Last time when I had set up system for Android Development I remember messing up a lot and ending up installing too many things here and there and in the process did learn how to do it properly. I did not document that as a blog as it was too fragmented an experience at that time but this time round I did it properly and everything (well, okay, almost everything) was perfect.

<!-- more -->

There is lot of material on the web but again that is what led to a less than perfect install last time as it is all disjointed, making the sequence go wrong, using one way for one thing another way for second and ending us with a not so nice experience distracting you from what you want to do, start developing something on android platform or perhaps just get the adb set-up to flash your nexus phone.

So presented below is a guide that will help you prepare your Linux Mint 13 or equivalent distro for you to start android development.
You will notice that these notes do not require downloading 'android sdk' separately and that is to save time and effort, trust me.

## Step 1: Download required files

Download following files:

![Fig-2](../assets/images/2016/07/20121018_Fig_2.png)

Links to original file locations:
* [Script to Update Java](http://webupd8.googlecode.com/files/update-java-0.5b) (Updated link to the latest version of script as highlighted in screenshot.)
* [Java 7 SDK](http://download.oracle.com/otn-pub/java/jdk/7u7-b10/jdk-7u7-linux-i586.tar.gz)
* [Java 7 Samples and Demo](http://download.oracle.com/otn-pub/java/jdk/7u9-b05-demos/jdk-7u9-linux-i586-demos.tar.gz)
* [Java 7 API Docs](http://download.oracle.com/otn-pub/java/jdk/7u6-b24/jdk-7u6-apidocs.zip)
* [Java 6 Samples and Demo](http://download.oracle.com/otn-pub/java/jdk/6u37-b06-demos/jdk-6u37-linux-i586-demos.tar.gz)
* [Java 6 API Docs](http://download.oracle.com/otn-pub/java/jdk/6u30-b12/jdk-6u30-apidocs.zip)
* [Java 6 SDK](http://download.oracle.com/otn-pub/java/jdk/6u37-b06/jdk-6u37-linux-i586.bin)

If you don't want to move around different webpages and websites, I have also uploaded all these files on mediafire on [this link](http://www.mediafire.com/?4x3u3if9o7dy4)

## Step 2: Install Oracle Java

You might ask, why do we need to do it this way?

That's because Oracle Java 6 SDK is a pre-requisite for installing Android SDK but it's not available in Ubuntu or Linux Mint repository so it can't be installed using synaptic or apt-get.

Right then, I am assuming that all the files downloaded above are placed in 'Downloads' directory. If not, please replace 'Downloads' in all commands with whichever directory you have downloaded these file to.

```bash linenums="1"
#1. Open terminal and type:
cd Downloads 
#2. Make the downloaded .bin Java 6 file executable and run
chmod a+x jdk-6u37-linux-i586.bin 
./jdk-6u37-linux-i586.bin 
###This will create a directory named "jdk1.6.0_37".
#3. Untar the Java 7 SDK 
tar -xvf jdk-7u7-linux-i586.tar.gz
###This will create a directory named "jdk1.7.0_07".
#4. Unzip the Java 6 api docs 
unzip jdk-6u30-apidocs.zip -d jdk1.6.0_37/
###This command will unzip the apidocs zip file 
###and place the contents in "jdk1.6.0_37"
#5. Unzip the Java 7 api docs
unzip jdk-7u6-apidocs.zip -d jdk1.7.0_07/
###This command will unzip the apidocs zip file 
###and place the contents in "jdk1.7.0_07"
#6. Untar the Java 6 demos and samples
tar -xvf jdk-6u37-linux-i586-demos.tar.gz
###This command will untar the demos and samples file 
###and place the contents in "jdk1.6.0_37"
#7. Untar the Java 7 demos and samples
tar -xvf jdk-7u9-linux-i586-demos.tar.gz
###This will create a folder named jdk1.7.0_09. 
###Copy the contents of this folder into jdk1.7.0_07.
#8. Move the Java 6 to it's proper location
sudo mv jdk1.6.0_37 /usr/lib/jvm
###You will be asked to provide root password.
#9. Now move the Java 7 to it's proper location
sudo mv jdk1.7.0_07 /usr/lib/jvm
#10. Make the script to update java update-java-0.5b executable
#then execute it by using following commands in terminal.
chmod +x update-java-0.5b
sudo ./update-java-0.5b
```
You will be presented with following selection box:

![Fig-3](../assets/images/2016/07/20121018_Fig_3.png)

Once you click on OK you will be presented with following screen:

![Fig-4](../assets/images/2016/07/20121018_Fig_4.png)

Select the radio button and click on OK.

Once Java 6 SDK is installed repeat step 10 and this time when you reach the selection window select Java 7 as shown below.

![Fig-5](../assets/images/2016/07/20121018_Fig_5.png)

Now Oracle Java 6 and Oracle Java 7 will both be installed on your system. To check this you can use the tool 'galternatives'. This can be installed by typing following command on the terminal window:

```bash linenums="1"
sudo apt-get install galternatives
galternatives
```

This will open the 'G Alternatives' window, scroll down to 'Java' in left hand pane and click on it. You should see both versions installed and radio button for highest version selected as shown below:

![Fig-6](../assets/images/2016/07/20121018_Fig_6.png)

## Step 3: Install eclipse


1. Open Synaptic package manager and type eclipse, click on the check-box next to it and select 'Mark for installation' then click on 'Apply' as shown below.
   
    ![Fig-7](../assets/images/2016/07/20121018_Fig_7.png)

2. Once Eclipse is installed, we need to find out whether the necessary SWT (Standard Widget Toolkit) libraries link are set correctly or not. This is to avoid Eclipse throwing a tantrum and not starting because it is unable to find the SWT library. As you can see in the screenshot below it's a pretty quick thing:
    
    ![Fig-8](../assets/images/2016/07/20121018_Fig_8.png)
    
    1.  First type the following command to check if whether SWT directory exists or not:
        
      ```bash
      ls ~/.swt/lib/linux/x86/
      ```
      If you see the same message as shown in screenshot above 'ls: cannot access /home//.swt/lib/linux/x86/: No such file or directory', then it means we need to create the SWT directory so continue to sub-step B.

      If this command does not result in this message nor does it show a list of files (blue text in screenshot) then skip directly to sub-step C.

      If it does show the list of files in blue in above screenshot, you don't need to do anything further and for you it's time to move to next step.
    
    2. Type the following command in terminal to create the SWT directory:
       
      ```bash
       mkdir -p ~/.swt/lib/linux/x86/
       ```

    3. If the swt directory exist, but nothing is listed (no blue text), then run the following command in terminal:
      
      ```bash
      ln -s /usr/lib/jni/libswt-* ~/.swt/lib/linux/x86/
      ```
3. Finally as shown in screenshot, type the command in sub-step 2.1 once again and you should see the list shown in blue on the screenshot.

Time to move on to install ADT (Android Development Tools Plugin on eclipse.

## Step 4: Install ADT Plug-in for Eclipse

OK we have so far installed Java, installed eclipse and now we are all set to install Android. To do so we will follow the screenshots below:

* When you start eclipse, you will be shown a splash screen, ask you to set workspace which I leave default and finally this window will open. As shown, click on the Workbench in right hand side corner. This will lead to following window.
  
    ![Fig-9](../assets/images/2016/07/20121018_Fig_9.png)

* Here Click on Help > Install New Software. This will open following window.
  
    ![Fig-10](../assets/images/2016/07/20121018_Fig_10.png)
  
    ![Fig-13](../assets/images/2016/07/20121018_Fig_13.png)

* Click on 'Add' button in red rectangle above. Following pop-up window will appear.
  
    ![Fig-11](../assets/images/2016/07/20121018_Fig_11.png)

* In Name type 'ADT Plugin' or whatever name you want to give.

* In Location type '[https://dl-ssl.google.com/android/eclipse/](https://dl-ssl.google.com/android/eclipse/)'

* Then click OK. On following window it will first show pending but eventually it will look as below.
  
    ![Fig-12](../assets/images/2016/07/20121018_Fig_12.png)
  
  * Here select the first option "Developer Tools" and click OK.
  
      ![Fig-14](../assets/images/2016/07/20121018_Fig_14a.png)
  
* Click "NEXT".

    ![Fig-14](../assets/images/2016/07/20121018_Fig_14.png)

* Click "NEXT".
    
    ![Fig-15](../assets/images/2016/07/20121018_Fig_15.png)

* Let it run in foreground i.e. don't do anything and just wait.

    ![Fig-16](../assets/images/2016/07/20121018_Fig_16.png)

* Click "RESTART NOW". You will be presented with following window on restart.
    
    ![Fig-17](../assets/images/2016/07/20121018_Fig_17.png)

* Now leave the target location as is and leave everything as default and click "NEXT".

    ![Fig-18](../assets/images/2016/07/20121018_Fig_18.png)

* As shown above, selected the "ACCEPT ALL" radio button and click "INSTALL".
  
* Now the android SDK is installed on the system along with other things. Close all the open windows just to clear any screen clutter.

* Now open the terminal and type following commands:

    ![Fig-19](../assets/images/2016/07/20121018_Fig_19.png)

    ```bash
    cd android-sdks/tools
    ./android 
    ```

* It will open the following window:

    ![Fig-20](../assets/images/2016/07/20121018_Fig_20.png)

    !!! note
        1. Select as shown above and optionally you can also select checkbox against Documentation and Samples. Once done click on 'INSTALL x Packages'. 
        2. On the next window, for which I did not take a screenshot but which is same as the one before previous screenshot of terminal, select radio button 'ACCEPT ALL' and click on 'INSTALL'. 
        3. Now once you are back to this window select 'Google APIs' and click on 'Install 1 package'.
        4. On the package list, click on 'ACCEPT' radio button and click on 'INSTALL'.

Android Development Tools and SDK is now installed. We just need to configure few things.

## Step 5: Final Configurations

**adb Environmental Variables**

1. Go to home folder

1. Press ++ctrl+h++
        
    ![Fig-21](../assets/images/2016/07/20121018_Fig_21.png)

1. Locate the .bashrc file, if it does not exist, create one (In home folder, right click and select 'Create New Document > Empty Document').

1. Open the file in gedit and add export `PATH=${PATH}:/tools:/platform-tools` at the end, if you created the file yourself just add this line and save.

    ![Fig-22](../assets/images/2016/07/20121018_Fig_22.png)

**Set the PATH environment**

1. Go to home folder
1. Press ++ctrl+h++
1. Locate the .profile file
1. Open the file in gedit and add the following at the end.

    ```bash linenums="1"
    ## set PATH so it includes user's Android SDK if it exists

    if [ -d "$HOME/android-sdks" ] ; then

      PATH="$HOME/android-sdks:$HOME/android-sdks/tools:$PATH"

    fi
    ```

    ![Fig-23](../assets/images/2016/07/20121018_Fig_23.png)

**Set-up udev**

This step is only required if you want to use your android device for development purpose or if you want to flash a custom ROM.

1. Open the terminal and type following:

    ```bash 
    gksudo nautilus /etc/udev/rules.d
    ```


2. Create new document like we did above- Right click on empty space and select 'Create New Document' and then 'Empty Document.

1. Name this document as '51-android.rules'

1. Open the document with Gedit and add following lines - assuming you are using 'Nexus S' like me, if not see if your phone details are available on this link: [http://wiki.cyanogenmod.com/wiki/Udev](http://wiki.cyanogenmod.com/wiki/Udev) and if not follow the guideline under the heading 'Manually create udev rules' on that link.

    ![Fig-24](../assets/images/2016/07/20121018_Fig_24.png)

2. Now make this 51-android.rules file executable by typing following command in the terminal window:

```bash
sudo chmod a+r /etc/udev/rules.d/51-android.rules
```

## Step 6: Create Android Virtual Device

* Open eclipse and follow the screenshots below:
    
    ![Fig-25](../assets/images/2016/07/20121018_Fig_25.png)

* Click on Window - AVD Manager to get to next screen except that in your screen there will be no entry.
    
    ![Fig-26](../assets/images/2016/07/20121018_Fig_26.png)

* Click on "NEW" to create a new AVD. It will open next window.
    
    ![Fig-27](../assets/images/2016/07/20121018_Fig_27.png)

* Fill details as above - You can chose name of your choice and change details as per your requirements.

    ![Fig-28](../assets/images/2016/07/20121018_Fig_28.png)

* To Start the AVD, click on Start.

* Finally, you will be able to see the AVD as below:
    
    ![Fig-29](../assets/images/2016/07/20121018_Fig_29.png)

This is it. Restart and your system is now all set for developing wonderful Android Applications.
