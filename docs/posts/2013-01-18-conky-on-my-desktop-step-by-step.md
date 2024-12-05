---
title: Conky on my desktop - step by step
slug: conky-on-my-desktop-step-by-step
draft: False
description: Conky on my desktop - step by step
authors: ['ankit']
date: 
  created: 2013-01-18 13:09:00
  updated: 2013-01-18 13:09:00
comments: true
categories:
  - Linux
  - Software
---

![Fig-1](../assets/images/2016/07/20130118_Fig_1.png)

## Background

My new friend Damjan recently mentioned that he liked the Conky on my desktop and asked for details as have few others so I figured a post on the topic will be useful.

Many who have been playing with conky seem to believe it's real easy stuff but I feel there are too many options and very little explanation which means it can be lot of messing around with different options and can take a while to get to a point where you have what you want.

To make this conky appear exactly the way it is on my screen on your desktop follow below.

<!-- more -->

## Step 1. Install Conky from Synaptic

![Fig-2](../assets/images/2016/07/20130118_Fig_2.png)

Open the synaptic package manager and follow steps as shown in screenshot above. Actually I don't think conky colors is required so if it does not appear in search result don't bother. From memory, that was installed by me as part of experimenting.

## Step 2. Install the fonts used in this conky

Download and install the fonts 'pf_tempesta_five_condensed.ttf' and 'ZegoeUI-U.ttf' from web or I have uploaded these to mediafire and can be download from this [link](http://www.mediafire.com/?4ycy1sxxs5trn).

## Step 3. Change the conky config file

1. Download my conky configuration in the file named `.conkykrc` from this [mediafire link](http://www.mediafire.com/?nm88my3minnzao5).
2. Open 'Home' directory and press ++Ctrl+h++ to show hidden files.
3. Locate the `.conkykrc` file and delete it.
4. Now paste the `.conkykrc` file downloaded in step 1 to home folder.

## Step 4. Enable settings to run conky at start-up

1. Open 'Startup Application' from Menu > Preferences.
   
    ![Fig-3](../assets/images/2016/07/20130118_Fig_3.png)

2. Click on 'Add' button and fill the fields as shown above.
   
    ![Fig-4](../assets/images/2016/07/20130118_Fig_4.png)

3. Restart the computer and it's all done.

## Step 5: Configure time-zones on the conky config

OK, so you have conky running as it is for me but you might want different time-zones than the one I have in which case you will need to modify the .conkykrc file in 'Home' directory.

1. Open 'Home' directory and press 'Ctrl+h' to show hidden files.
2. Locate the `.conkykrc` file and open it in text editor of your choice. I use gedit.
3. Now Open Terminal and Type 'tzselect' and press enter.
4. A list of continents will be displayed, select the one of your interest by typing the number against it and press enter. - *I selected 'Americas' so I typed '2'*
5. Then you will be presented a list of countries. Again select the one of your interest by typing the number against it and press enter. - *I selected 'North America' so I typed '49'*
6. Finally, it will display time-zones in that country. As above, select the one of your interest by typing the number against it and press enter. - *I selected 'Mountain Time' so I typed '18'*
7. It will confirm selection and then mention TZ being used. - *For my selection it displayed 'Therefore TZ='America/Denver' will be used.'*
8. This text after 'TZ=' is what is important for us. Copy this and go back to `.conkykrc` file.
9. Under 'TIMEZONE' say you want to replace Nashville with Denver then you locate Nashville (Line 83, Col 64) and replace the text with the city of your choice, in this case 'Denver'.
10. Now to reflect the appropriate time-zone, replace the existing time-zone 'America/Chicago' with the one from step above. - *In this example with  'America/Denver''.*


That's it. All Done !!!

Hope you find it useful. Feel free to ask questions on settings here and if it's something I was stuck with I might be able to help.
