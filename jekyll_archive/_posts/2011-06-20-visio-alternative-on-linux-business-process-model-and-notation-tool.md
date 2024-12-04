---
title: "Visio Alternative on Linux - Business Process Model and Notation Tool"
slug: "visio-alternative-on-linux-business-process-model-and-notation-tool"
toc: false
classes: "wide"
date: 2011-06-20T17:41:00
draft: false
description: Visio Alternative on Linux - Business Process Model and Notation Tool
last_modified_at: 2011-06-20T17:41:00
---
UPDATE: <a href="http://pencil.evolus.vn/">PENCIL</a> is an opensource software which is a pretty good alternative as well with a smaller learning curve and is Opensource.
I was recently looking for Visio alternatives on Linux and while Dia is good it lacks the oomph of Visio and hence not an easy sell for new and potential Linux converts.
Now good news for those open to enter the wonderful world of Linux is that any OS need not have an alternative for it to be usable to you, all it needs is the ability to let you run the software you find useful.
So this post isn't about why Linux is better. It is about knowing that there is something better than the software you have got accustomed to. If someone is adamant on continuing with the software they have fallen in love with, there is always WINE / Virtualbox but if you have opened to the idea of new OS but you are taking baby steps software like yEd can help you take a giant leap. yEd is written in Java and can run on Windows, Mac and of-course Linux.
Before we move into the steps of how to get it and use it let me bore you little with what are the other alternatives I explored.
During my quest I came across two other useful candidates Activiti 5.6, ARIS Express 2.3. What went against these and in favour of yEd? Read on:
<ol>
<li>
Ease of installation
<ul>
<li>
First on the list is ARIS Express 2.3. Now this requires registration which is my first gripe. I could have lived with that but as claimed on their website the product is meant for Windwos and is reported to be working fine for Linux. What they forgot to mention is on linux using Wine or atleast that is what it did on my set-up. Now am not sure if it has something to do with my installing JRE in wine for using Open Workbench (see last post) or it is because the product works on similar lines as Open Workbench installer but eighther way it does not run natively on Linux and for that reason alone it is unreliable and looses points even to Activiti.
</li>
<li>
For easiest installation, Activiti 5.6 can be added into Eclipse but that results in a bit complicated and not so user friendly user-experience. You will at-least need to have one Activiti project created in eclipse before you can draw using Activiti Diagram. (Check Screenshot)
  <img src="/content/images/2016/07/20110620_Fig_2.png" alt="Alt Text" style="width:75%;height:40%;">
</li>
<li>
Above might be circumvented by installing standalone Activiti bit that involves configuring ANT and other stuff. While guide is there, it is not very straight forward and considering we want to win new users not scare them, it is best left as untouched topic.
</li>
</ul>
</li>
</ol>
<ul>
<li>Ease of Use - While all the three products yEd, Activiti and ARIS are superior to Visio, in terms of ease of use I think it's yEd which wins hands down even to Visio. The one aspect of this software that won me over was it's ability to auto align the whole flowchart / diagram with just one click and it can do it in several layouts.</li>
</ul>
OK, now that I have covered comparison, let's get down to how we install it on our beloved Linux Mint. It's really very simple.
Step 1: Go to this website - <a href="http://www.yworks.com/en/products_yed_download.html">http://www.yworks.com/en/products_yed_download.html</a>
Step 2: Download yEd for your platform. In our case for Linux Mint the 43 MB sh file in front of Linux.
Step 3:
<ul>
<li>a) Go to the folder where it is downloaded, select the yEd-3.7.sh file and right click on it.</li>
<li>b) In the right click menu select Properties (last entry). This will open the yEd-3.7.sh properties box.</li>
<li>c) On the Properties box, click on Permissions tab.</li>
<li>d) Click the checkbox in front of Execute Allow executing file as program.</li>
<li>e) Click Close.</li>
<li>f) Double click on the  yEd-3.7.sh file. It will display a dialogue box with four options Run in terminal, Display, Cancel, Run. Select Run in terminal</li>
<li>g) yEd will now install, it may give one small error but it did not affect anything at all so ignore it if you get it.</li>
<li>h) Follow the wizard and leave default options.</li>
<li>i) Once done, you will have yEd successfully installed and can be found in MENU ALL APPLICATIONS-OTHER.</li>
<li>j) Create a shortcut of yEd by dragging yEd from MENU ALL APPLICATIONS-OTHER onto desktop. You may need to make this dragged link executable by right clicking the link and following steps b,c and d.</li>
</ul>
All Done !!!
A quick tutorial from yWorks:
<iframe width="320" height="266" src="https://www.youtube.com/embed/ujMhxPJnJCw" frameborder="0" allowfullscreen></iframe>
Find more on <a href="http://www.yworks.com/en/products_yed_videos.html">http://www.yworks.com/en/products_yed_videos.html</a>
Having seen, how nice and easy it is to create the flowchart, let's also see the best feature of the product that is one click alignment.
<iframe width="320" height="266" src="https://www.youtube.com/embed/eTasbZ1QRK4" frameborder="0" allowfullscreen></iframe>
