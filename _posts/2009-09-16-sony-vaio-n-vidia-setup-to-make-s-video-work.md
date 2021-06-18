---
title: "Sony VAIO N-VIDIA setup to make S-Video work"
slug: "sony-vaio-n-vidia-setup-to-make-s-video-work"
toc: false
classes: "wide"
date: 2009-09-16T17:10:00
draft: false
description: Sony VAIO N-VIDIA setup to make S-Video work
last_modified_at: 2009-09-16T17:10:00
---
<hr>
<strong>UPDATE for 9.10</strong><br>
For Ubuntu 9.10 I was just not able to get it work and finally I figured it out. The problem is with the latest Nvidia driver, the one that ubuntu says recommended. In order to make your TV Out work, you must uninstall the latest release version and install the one just lower than that. (The working version for me was 173.) Then follow these steps:
<code>sudo nvidia-xconfig</code>
<code>sudo reboot</code>
<code>sudo nvidia-settings</code>
Then follow the steps shown below. If you are lucky you wont need to refer Section A of this post at all. I did not have to do that !!!
Cheers,<br>
Ankit<br>
<strong>UPDATE for 9.10</strong>
<hr>
S-Video did not work out of the box on ubuntu Sony Vaio combination but it was not difficult to have it sorted once the following steps were taken.
I am giving the steps to set-up TV-Out assuming your n-vidia file is working fine, if not follow steps in Section A before completing steps below.
<ul>
<li>Step 1: Connect laptop and TV through S-Video Cable.</li>
<li>Step 2. System-&gt;Administration-&gt;Nvidia X-Server Settings</li>
<li>Step 3: Click on X-Server Display Configuration and then click on &quot;Detect Displays&quot;. If you have connected fine, the screen should be something like this:</li>
</ul>
<a href="http://4.bp.blogspot.com/_-KsGlJDRxDw/SrFWWRqfjhI/AAAAAAAAAHY/Ze7d7J7dKT8/s400/Screenshot-NVIDIA+X+Server+Settings-1.png">http://4.bp.blogspot.com/_-KsGlJDRxDw/SrFWWRqfjhI/AAAAAAAAAHY/Ze7d7J7dKT8/s400/Screenshot-NVIDIA+X+Server+Settings-1.png</a>
<ul>
<li>Step 4: Click on the TV icon, following screen will appear.</li>
</ul>
<a href="http://2.bp.blogspot.com/_-KsGlJDRxDw/SrFY6ndgpeI/AAAAAAAAAHg/Tkskm1BYebM/s400/Screenshot-NVIDIA+X+Server+Settings-2.png">http://2.bp.blogspot.com/_-KsGlJDRxDw/SrFY6ndgpeI/AAAAAAAAAHg/Tkskm1BYebM/s400/Screenshot-NVIDIA+X+Server+Settings-2.png</a>
<ul>
<li>Step 5: Click on &quot;Configure&quot; and then select &quot;Twinview&quot;</li>
</ul>
<a href="http://1.bp.blogspot.com/_-KsGlJDRxDw/SrFY7MnhQzI/AAAAAAAAAHo/hw7mVXTa4PI/s400/Screenshot-NVIDIA+X+Server+Settings-3.png">http://1.bp.blogspot.com/_-KsGlJDRxDw/SrFY7MnhQzI/AAAAAAAAAHo/hw7mVXTa4PI/s400/Screenshot-NVIDIA+X+Server+Settings-3.png</a>
<ul>
<li>Step 6: Now I found that keeping TV on left ensured that while using dailymotion full screen it will come on TV but keeping on right it came on laptop monitor so you may want to depending on your preference change the location to left as shown below.</li>
</ul>
<a href="http://4.bp.blogspot.com/_-KsGlJDRxDw/SrFY7bt7sCI/AAAAAAAAAHw/pGeyp1_GfeU/s400/Screenshot-NVIDIA+X+Server+Settings-4.png">http://4.bp.blogspot.com/_-KsGlJDRxDw/SrFY7bt7sCI/AAAAAAAAAHw/pGeyp1_GfeU/s400/Screenshot-NVIDIA+X+Server+Settings-4.png</a>
This is it.You should now be able to watch streaming video on your TV...:)
<h4 id="sectiona">Section A:</h4>
I found the most useful instructions below, but I did have to make few tweaks.
Source: <a href="http://ubuntuforums.org/showthread.php?t=98456">http://ubuntuforums.org/showthread.php?t=98456</a>
Right, I will walk step by step based on the guide from the source mentioned above and mention the changes / tweaks I did to make it work on my laptop. I am sure it should work with same conf on other VAIO as well.
<ul>
<li>
Step 1: Aplication-&gt; Accessories-&gt; Terminal
</li>
<li>
Step 2: Type sudo cp /etc/X11/xorg.conf /etc/X11/xorg.conf.backup
</li>
<li>
Step 3: You will need to enter password at this stage. Enter the password.
</li>
<li>
Step 4: Now Type: sudo gedit /etc/X11/xorg.conf
</li>
</ul>
Difference in old and new xorg.conf files:<br>
I used the following command on terminal to compare the old and new .conf files:
<code>diff -u /etc/X11/xorg.conf.backup /etc/X11/xorg.conf</code>
The numbers between @@ represent Row number and column number. - stands for old and + for new.
<pre>
@@ -61,9 +61,9 @@
Section "Monitor"
Identifier "Monitor0"
VendorName "Unknown"
- ModelName "TV-0"
- HorizSync 28.0 - 55.0
- VertRefresh 43.0 - 72.0
+ ModelName "Nvidia Default Flat Panel"
+ HorizSync 29.0 - 49.0
+ VertRefresh 0.0 - 60.0
EndSection

Section "Monitor"
@@ -110,12 +110,14 @@

# Removed Option "TwinView" "0"
# Removed Option "metamodes" "DFP: nvidia-auto-select +0+0"
+# Removed Option "TwinView" "1"
+# Removed Option "metamodes" "TV: nvidia-auto-select +0+0, DFP: nvidia-auto-select +1024+0"
Identifier "Screen0"
Device "Device0"
Monitor "Monitor0"
DefaultDepth 24
- Option "TwinView" "1"
- Option "metamodes" "TV: nvidia-auto-select +0+0, DFP: nvidia-auto-select +1024+0"
+ Option "TwinView" "0"
+ Option "metamodes" "DFP: nvidia-auto-select +0+0"
SubSection "Display"
Depth 24
EndSubSection

</pre>
Copy of my xorg.conf and xorg.conf.backup
xorg.conf - CURRENT - WORKING VERSION
<pre>
Section "ServerLayout"
Identifier "Default Layout"
Screen 0 "Screen0" 0 0
InputDevice "Keyboard0" "CoreKeyboard"
InputDevice "Mouse0" "CorePointer"
EndSection

Section "Module"
Load "glx"
EndSection

Section "ServerFlags"
Option "Xinerama" "0"
EndSection

Section "InputDevice"

# generated from default
Identifier "Keyboard0"
Driver "kbd"
EndSection

Section "InputDevice"

# generated from default
Identifier "Mouse0"
Driver "mouse"
Option "Protocol" "auto"
Option "Device" "/dev/psaux"
Option "Emulate3Buttons" "no"
Option "ZAxisMapping" "4 5"
EndSection

Section "Monitor"
Identifier "Configured Monitor"
EndSection

Section "Monitor"
Identifier "Monitor0"
VendorName "Unknown"
ModelName "Nvidia Default Flat Panel"
HorizSync 29.0 - 49.0
VertRefresh 0.0 - 60.0
EndSection

Section "Monitor"
Identifier "Monitor1"
VendorName "Unknown"
ModelName "TV-0"
HorizSync 28.0 - 55.0
VertRefresh 43.0 - 72.0
EndSection

Section "Device"
Identifier "Configured Video Device"
Driver "nvidia"
Option "NoLogo" "True"
EndSection

Section "Device"
Identifier "Device0"
Driver "nvidia"
VendorName "NVIDIA Corporation"
BoardName "GeForce Go 7400"
EndSection

Section "Device"
Identifier "Device1"
Driver "nvidia"
VendorName "NVIDIA Corporation"
BoardName "GeForce Go 7400"
Option "TVOutFormat" "SVIDEO"
Option "TVStandard" "PAL-G"
Option "ConnectedMonitor" "Monitor[1]"
BusID "PCI:1:0:0"
Screen 1
EndSection

Section "Screen"
Identifier "Default Screen"
Device "Configured Video Device"
Monitor "Configured Monitor"
DefaultDepth 24
EndSection

Section "Screen"

# Removed Option "TwinView" "0"
# Removed Option "metamodes" "DFP: nvidia-auto-select +0+0"
# Removed Option "TwinView" "1"
# Removed Option "metamodes" "TV: nvidia-auto-select +0+0, DFP: nvidia-auto-select +1024+0"
Identifier "Screen0"
Device "Device0"
Monitor "Monitor0"
DefaultDepth 24
Option "TwinView" "0"
Option "metamodes" "DFP: nvidia-auto-select +0+0"
SubSection "Display"
Depth 24
EndSubSection
EndSection

Section "Screen"
Identifier "Screen1"
Device "Device1"
Monitor "Monitor1"
DefaultDepth 24
Option "TwinView" "0"
Option "metamodes" "TV: nvidia-auto-select +0+0"
SubSection "Display"
Depth 24
EndSubSection
EndSection
</pre>
xorg.conf.backup - OLD COPY
<pre>
Section "ServerLayout"
Identifier "Default Layout"
Screen 0 "Screen0" 0 0
InputDevice "Keyboard0" "CoreKeyboard"
InputDevice "Mouse0" "CorePointer"
EndSection

Section "Module"
Load "glx"
EndSection

Section "ServerFlags"
Option "Xinerama" "0"
EndSection

Section "InputDevice"

# generated from default
Identifier "Keyboard0"
Driver "kbd"
EndSection

Section "InputDevice"

# generated from default
Identifier "Mouse0"
Driver "mouse"
Option "Protocol" "auto"
Option "Device" "/dev/psaux"
Option "Emulate3Buttons" "no"
Option "ZAxisMapping" "4 5"
EndSection

Section "Monitor"
Identifier "Configured Monitor"
EndSection

Section "Monitor"
Identifier "Monitor0"
VendorName "Unknown"
ModelName "TV-0"
HorizSync 28.0 - 55.0
VertRefresh 43.0 - 72.0
EndSection

Section "Monitor"
Identifier "Monitor1"
VendorName "Unknown"
ModelName "TV-0"
HorizSync 28.0 - 55.0
VertRefresh 43.0 - 72.0
EndSection

Section "Device"
Identifier "Configured Video Device"
Driver "nvidia"
Option "NoLogo" "True"
EndSection

Section "Device"
Identifier "Device0"
Driver "nvidia"
VendorName "NVIDIA Corporation"
BoardName "GeForce Go 7400"
EndSection

Section "Device"
Identifier "Device1"
Driver "nvidia"
VendorName "NVIDIA Corporation"
BoardName "GeForce Go 7400"
Option "TVOutFormat" "SVIDEO"
Option "TVStandard" "PAL-G"
Option "ConnectedMonitor" "Monitor[1]"
BusID "PCI:1:0:0"
Screen 1
EndSection

Section "Screen"
Identifier "Default Screen"
Device "Configured Video Device"
Monitor "Configured Monitor"
DefaultDepth 24
EndSection

Section "Screen"

# Removed Option "TwinView" "0"
# Removed Option "metamodes" "DFP: nvidia-auto-select +0+0"
Identifier "Screen0"
Device "Device0"
Monitor "Monitor0"
DefaultDepth 24
Option "TwinView" "1"
Option "metamodes" "TV: nvidia-auto-select +0+0, DFP: nvidia-auto-select +1024+0"
SubSection "Display"
Depth 24
EndSubSection
EndSection

Section "Screen"
Identifier "Screen1"
Device "Device1"
Monitor "Monitor1"
DefaultDepth 24
Option "TwinView" "0"
Option "metamodes" "TV: nvidia-auto-select +0+0"
SubSection "Display"
Depth 24
EndSubSection
EndSection
</pre>