---
title: "Sony VAIO FE21H Webcam on skype"
slug: "sony-vaio-fe21h-webcam-on-skype"
toc: false
classes: "wide"
date: 2009-09-15T17:00:00
draft: false
description: Sony VAIO FE21H Webcam on skype
last_modified_at: 2009-09-15T17:00:00
---
Alright friends not a huge tip but still I, being new fan of Ubuntu, installed it on my media laptop...Sony VAIO...
one might ask what is media laptop...well I had a bit of problem with my Sony VAIO some 1.5 years back and a key got stuck and as it goes with any Sony product there was no cheap solution at hand...
At that time for some reason it appeared like a motherboard issue and I just bought another Dell laptop...later I realised that it was a keyboard issue so I invested in a wireless keyboard and had two lappies at home just like that :)...I figured that with wireless keyboard VAIO laptop will make perfect companion to my 32&quot; Samsung and hence it got the name of media laptop.
I use this laptop to browse without fear as I will never ever do any important work on it so am never worried of loosing..not that I ended up having any virus at all....and now with Linux I doubt if there will ever be any virus on this laptop....but anyway I have gone on a tangent...
What I started to tell was a tip on how we can make VAIO's inbuilt motion-eye webcam to behave and the tip goes as below...
Incase your webcam is not giving good images on ur Sony VAIO, you may want to try this:
<ol>
<li>Goto System-&gt;Preferences-&gt;Main Menu</li>
<li>In Main Menu window click on Internet in left hand navigation under &quot;Menu&quot; and then click on Skype&quot; in right hand under &quot;Items&quot;.</li>
<li>Now click on &quot;Properties&quot; button.</li>
<li>It will open a Launcher Properties dialogue box.</li>
<li>In third field &quot;Command&quot; replace &quot;Skype&quot; with this line:<br>
<code>bash -c 'LD_PRELOAD=/usr/lib/libv4l/v4l1compat.so skype'</code></li>
</ol>
That is it. You should now have a properly working motion-eye with skype.
There is more info on this link:
<a href="https://help.ubuntu.com/community/Webcam">https://help.ubuntu.com/community/Webcam</a>
Ciao !!!
