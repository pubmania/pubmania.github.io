---
title: "Part 2 - Configure Epson S515W on Linux Mint / Ubuntu 10.04"
slug: "part-2-configure-epson-s515w-on-linux-mint-ubuntu-10-04"
toc: false
classes: "wide"
date: 2011-05-04T15:12:00
draft: false
description: Part 2 - Configure Epson S515W on Linux Mint / Ubuntu 10.04
last_modified_at: 2011-05-04T15:12:00
---
While the majority of settings are covered in my previous post here I found that each time I switched off my printer, it used to change it's IP address and I had to repeat Steps 7 to 16 each time. My printing and scanning needs are pretty limited so I never bothered working out a solution until today and knowing what I now know, it was quite a simple and quick solution I should have done this on the first place. Anyway as they say better late than never. :)
So to carry out the magical transformation to your printing experience follow the steps below:
<ol>
<li>On your printer (actual machine not on laptop / computer) go to Settings (Press the button with Wrench and Screwdriver symbol as shown in picture).<br>
<img src="../assets/images/2016/07/201011_Fig_6.png" alt="Alt Text" style="width:10%;height:5%;"></li>
</ol>
<ul>
<li>Using left arrow navigate to Network Settings (Computer and Printer icon)</li>
<li>Click OK button.</li>
<li>Using down arrow navigate to &quot;General Setup&quot; and click OK button.</li>
<li>Printer will show the question &quot;After changing the settings, network may be disconnected. Continue?&quot; and present options Yes and No with No selected (highlighted in Yellow.)</li>
<li>Using left arrow move to Yes and press OK.</li>
<li>Printer will now show the screen for &quot;Printer Name Setup&quot;, do not change anything. Just Click OK to proceed to next screen.</li>
<li>Now printer will show screen for TCP/IP screen with two options Auto which is selected by default and highlighted in yellow and Manual. Here using down arrow key select Manual.</li>
<li>Click OK button.</li>
<li>The screen will show current IP address assigned to printer something like 192.168.1.66.</li>
<li>Now I am assuming that you have already followed part 1 of this tutorial so on your laptop open the file epkowa.conf from /etc/sane.d. You can also open this file by typing the following command in terminal <code>gedit /etc/sane.d/epkowa.conf</code></li>
<li>Note down the IP address you entered last time 192.168.1.60 below usb and scsi. (Line 12 on my file.)</li>
<li>Now on your printer change IP address to match the one on last step. To do so, first click on left arrow on printer to reach the last digit of displayed IP address and then adjust the number using up or down arrow.</li>
<li>Once it is same as that on epkowa.conf file (192.168.1.60 in this example), click OK button. Now continue to click OK button on all remaining screens till you reach Network Settings screen (About 5 times)</li>
<li>Press OK one final time and that's it you are done.</li>
</ul>
If you are to now switch off and switch on the printer and test scan it should work without any issues.
Hope you find this useful.
