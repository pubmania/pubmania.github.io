---
title: Part 1 - Configure Epson S515W on Linux Mint / Ubuntu 10.04
slug: part-1-configure-epson-s515w-on-linux-mint-ubuntu-10-04
draft: False
description: Part 1 - Configure Epson S515W on Linux Mint / Ubuntu 10.04
authors: ['ankit']
date: 
  created: 2010-11-13 14:50:00
  updated: 2010-11-13 14:50:00
comments: false
categories:
  - Linux
  - Troubleshooting
  - Printer
---

!!! site-abstract "UPDATE"
    While this tutorial will get your printer up and running, you should also follow [Part 2](./2011-05-04-part-2-configure-epson-s515w-on-linux-mint-ubuntu-10-04.md) to ensure that it continues to work even after you have restarted your printer.

<!-- more -->

Lately I have not done much experiments and hence a stable system. I did not require any changes and all was well and then recently I changed over to Linux Mint which by the way is a UBUNTU derivative, very slick and very cool. Now after this reinstall I was able to get back all my previous installs and everything the usual way but scanning using Epson S515W was not out of the box and below are the steps I followed to get it working.

<!--h3 id="step1configureprinter"-->
## Step 1: Configure Printer

This really works quite easily in all Ubuntu installs. Goto System > Administration > Printer

![Alt Text](../assets/images/2016/07/201011_Fig_1.png)

Now you can see my printer configured but when you will get this window, you wil only see Print_to_PDF. You should then Click on arrow next to ADD and select Printer. It will open the window below:

![Alt Text](../assets/images/2016/07/201011_Fig_2.png)

Again under Network Printer it may not show anything initially but if your printer is on and configured to your wireless router it will identify in a moment or two. If it does not, click on Find Network Printer.

![Alt Text](../assets/images/2016/07/201011_Fig_3.png)

Once your printer appears, click on it and then click on 'Forward'.

<!--h3 id="step2printatestpage"-->
## Step 2: Print a test Page

Open the Printer window again from System>Administration>Printer and double click on printer. It should open the following window:

![Alt Text](../assets/images/2016/07/201011_Fig_4.png)

Click on 'Print Test Page'. If it prints the ubuntu test page correctly your printer is configured. Mine was so I will not go more in details of alternative option. If you do want to know more let me know and I will put a post.
However if now you will try to scan you will find that scanner either is not identified or if it is it does not complete the scanning and printer gets hanged, so over to next steps then.

<!--h3 id="step3installdriversandsoftwareforscanner"-->
## Step 3 - Install drivers and software for scanner

Goto the [avasys site](http://avasys.jp/eng/) that provides downloads and navigate for your model or if you have the same as mine just click on the link below and then goto Downloads and select All In One Printers. On the next page scroll down all the way and select the radio button for your printer.

<iframe width="425" height="344" src="https://www.youtube.com/embed/fUDZE6rcYTw" frameborder="0" allowfullscreen></iframe>

![Alt Text](../assets/images/2016/07/201011_Fig_5.png)

Now these installs need to happen in a sequence and we don't need all deb files on the next page anyway so I will mention download and install in sequence as it should be done.


1. From the section 'Download for Epson Stylus NX510/NX515/SX510W/SX515W/TX550W data package' download the data package iscan-data_1.4.0-1_all.deb.

2. Install this package now.

3. From the section 'Download for Epson Stylus NX510/NX515/SX510W/SX515W/TX550W core package' download iscan_2.26.0-3.ltdl7_i386.deb.

4. Install this package now

5. From the section 'Download for Epson Stylus NX510/NX515/SX510W/SX515W/TX550W network plugin package' download iscan-network-nt_1.1.0-2_i386.deb

6. Install this package now.

7. Now on your printer(actual machine not on laptop / computer) goto Settings (Press the button with Wrench and Screwdriver symbol as shown in the image Printer Control).
 
    ![Alt Text](../assets/images/2016/07/201011_Fig_6.png)

8. Using left arrow navigate to Network Settings (Computer and Printer icon)

9. Click OK button.

10. Using Down Arrow select 'Confirm Settings' and click OK button.

11. Press Down Arrow twice and it should show the Printer IP Address. Note it Down. It will be something like 192.168.1.60.

12. Now back on your laptop open terminal and type gksudo nautilus. You will be asked your superuser password. Provide that. It will open the file explorer with admin privileges. Be extremely careful now, you do not want to delete anything in this privilege mode.

13. In the file explorer, click on 'File System' and browse to the file path etc>sane.d and open the file named epkowa.conf. (Screenshot below)

14. In the file below usb and scsi add the line net 1865 so for our example this will be  net 192.168.1.60 1865. (In gedit it was line 12 for me.)

15. Save and close the file.

16. Close all windows.

    ![Alt Text](../assets/images/2016/07/201011_Fig_7.png)


## Step 4 - Test Scanner

Now open Menu>All Applications>Graphics>Image Scan! for Linux.

![Alt Text](../assets/images/2016/07/201011_Fig_8.png)

This should open the software window. Now click on preview to see that a document preview is produced. If it does you are all set. If not you must check the configuration of epkowa.conf and try again.

![Alt Text](../assets/images/2016/07/201011_Fig_9.png)

The preview of my 3.5 year olds drawing from scanner :

![Alt Text](../assets/images/2016/07/201011_Fig_10.png)

and the final scan is shown below:

![Alt Text](../assets/images/2016/07/2011_Fig_11.jpg)