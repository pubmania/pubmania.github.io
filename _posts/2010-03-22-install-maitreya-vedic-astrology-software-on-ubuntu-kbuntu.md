---
title: "Install Maitreya - Vedic Astrology Software on Ubuntu / Kbuntu"
slug: "install-maitreya-vedic-astrology-software-on-ubuntu-kbuntu"
toc: false
classes: "wide"
date: 2010-03-22T13:38:00
draft: false
description: Install Maitreya - Vedic Astrology Software on Ubuntu / Kbuntu
last_modified_at: 2010-03-22T13:38:00
---

{% plantuml %}
[First] - [Second]
{% endplantuml %}

First I must thank the Maitreya developers for coming up with such a wonderful Vedic Astrology software that works on Linux. I am not aware of any other vedic astrology software that works on Linux.
Next I have to say that the install instructions on the site (and in the tarball) are not written with a newbie in mind and I had to struggle a bit before I could get it to work. The compiling of source code is really similar for I guess all source codes in general on linux and in particular in Ubuntu / Kubuntu but thing is when you are new to the platform and probably have almost all required software in repositories you rarely come across a situation where you need to compile from a source code to install your favourite software. Anyway so without wasting time in chit-chat, below is the step by step installation of Maitreya 6 on Ubuntu / Kubuntu:
<pre><code>1. Download Maitreya 6 tarball.
2. Prepare the system for installing
3. Install wxWidgets 2.8 Dependencies
4. Configure and Build
5. Install
6. Create a desktop icon
</code></pre>
<ol>
<li>
Download Maitreya 6 tarball - From your browser goto <a href="http://maitreya.svn.sourceforge.net/viewvc/maitreya/">http://maitreya.svn.sourceforge.net/viewvc/maitreya/</a> and click on the link &quot;Download GNU tarball&quot;. This will download the maitreya.tar.gz file on your system.
</li>
<li>
Prepare the system for installing - I used the instructions from ubuntu help documentation that can be found here. However, I have documented the step that I used in sequence to achieve the objective.
<ul>
<li>Open the terminal.</li>
<li>Type - sudo apt-get install build-essential checkinstall</li>
<li>You will be asked for the password. Enter it.</li>
<li>Once system completes the above instruction and is ready to take next instruction then Type: sudo apt-get install cvs subversion git-core mercurial</li>
<li>Next type: <code>sudo chown yourusername /usr/local/src</code></li>
</ul>
 <div class="boxed">Please note that here you need to put the your user name so don't just copy paste. So if say user name is "ankit" , you will type sudo chown ankit /usr/local/src</div>
<ul>
<li>Next Type: <code>sudo chmod u+rwx /usr/local/src</code></li>
</ul>
Now the system is prepared for installing.
</li>
<li>
Install wxWidgets 2.8 Dependencies - As mentioned on Maitreya site, the software depends on wxWidgets 2.8 and corresponding packages must be installed. On the site itself is given the code that needs to copied onto the terminal to achieve this.
<ul>
<li>Either from the site or from below select the text.</li>
<li><code>sudo apt-get install libwxbase2.8-0 libwxbase2.8-dev libwxgtk2.8-0 libwxgtk2.8-dev wx2.8-headers wx2.8-i18n</code></li>
<li>Press Ctrl+C</li>
<li>Goto Terminal window and press Ctrl+Shift+V or click on Edit from top menu and select Paste.</li>
<li>Press enter.</li>
<li>You may have to provide password.</li>
<li>This should now install wxWidgets 2.8</li>
</ul>
Over to next step.
</li>
<li>
Configure and Build - There are few things that should be done before we start to configure the downloaded source code.
<ul>
<li>First goto the folder where maitreya.tar.gz file was downloaded in Step 1.</li>
<li>Now right click and select &quot;Extract Archive To&quot;.</li>
<li>Select the location /usr/local/src</li>
<li>This will extract a folder named maiterya into the location /usr/local/src</li>
</ul>
The content downloaded may change in future but at the time of writing this article it has two folders maitreya5 and maitreya6. All next steps will assume that folders name maitreya6 is present in your download but if not you will just have to replace with whatever folder is inside the extracted maitreya folder.
<ul>
<li>Goto your termincal window and type: cd /usr/local/src/maitreya/maitreya6/trunk</li>
<li>
<pre><code>Now type `./configure`.
</code></pre>
</li>
<li>
<pre><code>If it gives some bash error like permission denied or file does not exist etc try `sh ./confgure`. This is what worked from me though everywhere instructions were to just use without sh.
</code></pre>
</li>
<li>
<pre><code>It will take a bit of time but it should complete without any error and end with some instructions about using &quot;make&quot;.
</code></pre>
</li>
<li>
<pre><code>Now type `make` on terminal.
</code></pre>
</li>
<li>
<pre><code>It should be done with no errors if all steps were followed correctly so far.
</code></pre>
</li>
</ul>
Over to next step.
</li>
<li>
Install - Again there were options around using sudo make install but the ubuntu help I have referred to (link above), suggested that checkinstall is better and it also creates a .deb file and I like the idea so that next time if I have to reinstall I don't need to do all this circus so I used the following and would recommend the same.
<ul>
<li>So in terminal window type <code>sudo checkinstall</code>.</li>
<li>
<pre><code>When you run it it will ask some questions like doc-pak is not there, do you want to create?(Y) just type Y.
</code></pre>
</li>
<li>
<pre><code>Then it shows some options and asks if you want to edit. I typed 2 to edit name and entered Maitreya.
</code></pre>
</li>
<li>
<pre><code>It threw a warning that maitreya 6-1_i386 is not complaint with debian standard or something to that effect and I just pressed enter.
</code></pre>
</li>
<li>
<pre><code>After this it was all fine and finally a message was shown telling a debian package has been created and to remove use dpkg ...
</code></pre>
</li>
</ul>
The software should now be installed and you can test it by clicking the file named Maitreya6 at Location - /usr/local/src/maitreya/maitreya6/trunk/src/gui. However if you want to access it easily from desktop there is just one more step.
</li>
<li>
Create a desktop icon - To create a desktop icon goto the folder /usr/local/src/maitreya/maitreya6/trunk and copy the file maitreya6.desktop and paste in on desktop.
</li>
</ol>
This is it you have now installed the Maitreya software !!!
