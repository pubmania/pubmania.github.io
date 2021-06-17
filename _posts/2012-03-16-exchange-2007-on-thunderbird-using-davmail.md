---
title: "Exchange 2007 on Thunderbird using DAVMail"
slug: "exchange-2007-on-thunderbird-using-davmail"
toc: false
classes: "wide"
date: 2012-03-16T22:39:00
draft: false
description: Exchange 2007 on Thunderbird using DAVMail
last_modified_at: 2012-03-16T22:39:00
---
The start of this week was like a nightmare for me. Whole family was down with flu and I had the fever that is probably the highest ever of my entire life at 40.5 C (~ 106 F).
Anyway, surviving that was easier compared to the aftermaths of this health problem that forced me to stay in bed and inadvertently deal with office mails at home on a non-IE browser with Lite version which is crap and makes you feel miserable enough to kill yourself.
So the option I had was to either boot windows on a virtual machine or find a solution within linux. Obviously, I prefer the latter and was glad to work out a solution that can help me avoid booting windows.
I have listed below the steps I followed to achieve this, though in all honesty the documentation is quite good on sourceforge site itself. It's just that some of their screenshots are dated and in French (literally, no pun intended).
Now there are several options floating around but this set-up works flawlessly for me and so I will obviously recommend this over other methods.
It's so easy to configure that there really is no reason not to give it a shot.
<h3 id="step1installdavmail">Step 1. Install DAVMail</h3>
You can get the latest version from sourcefourge by following the link below:
<a href="http://davmail.sourceforge.net/download.html">http://davmail.sourceforge.net/download.html</a><br>
<img src="../assets/images/2016/07/20120316_Fig_1.png" alt="Fig-1" style="width:75%;height:40%;">
<div class="boxed">Select the download based on your distro. For Linux Mint 12 it will be Green Box and for non-debian based distros the red.</div>
Now double click on the downloaded .deb file and DAVMail will be installed taking care of any required dependencies.
<h3 id="step2configuredavmail">Step 2. Configure DAVMail</h3>
Once installed, you can open DAVMail on Linux Mint 12 under Internet.<br>
<img src="../assets/images/2016/07/20120316_Fig_2.png" alt="Fig-2" style="width:75%;height:40%;"><br>
You can copy all the settings from this screenshot, leave them with what is there by default or change if you need to. Most important part is the first field OWA (Exchange) URL. You must paste your exchange 2007 OWA URL here.<br>
<img src="../assets/images/2016/07/20120316_Fig_3.png" alt="Fig-3" style="width:75%;height:40%;">
Believe it or not, that's all the configuration you need to do for DavMail.
<h3 id="step3configurethunderbirdemailclient">Step 3. Configure Thunderbird Email Client</h3>
Now over to configuring the Thunderbird Email Client. Enter Details and Click on Continue. It will show next screen by itself.<br>
<img src="../assets/images/2016/07/20120316_Fig_4.png" alt="Fig-4" style="width:75%;height:40%;"><br>
Follow instructions as per next screenshot.<br>
<img src="../assets/images/2016/07/20120316_Fig_5.png" alt="Fig-5" style="width:75%;height:40%;">
If you see following warning, tick the checkbox and Click on Create Account.<br>
<img src="../assets/images/2016/07/20120316_Fig_6.png" alt="Fig-6" style="width:75%;height:40%;"><br>
After this you may be presented with a dialogue box to enter the username and password once again. If so provide details. Remember to try just abc.xyz as username for <a href="mailto:abc.xyz@officemail.com">abc.xyz@officemail.com</a> and only if that does not work and you are presented with the dialogue box again should you try the whole email id as username.
It does take quite some time in first run as Thunderbird downloads all the mails. I was happy with the speed though YMMV.
I have applied an MS Office based theme that you can find in add-ons directory. Link below:
<a href="https://addons.mozilla.org/en-US/thunderbird/addon/ms-office-2003-jb-edition/">https://addons.mozilla.org/en-US/thunderbird/addon/ms-office-2003-jb-edition/</a>
Finally my mailbox looks as below:<br>
<img src="../assets/images/2016/07/20120316_Fig_7.png" alt="Fig-7" style="width:75%;height:40%;">
<h3 id="step4configurecalendar">Step 4. Configure Calendar</h3>
On Linux Mint 12 Lightning the Thunderbird calendar client does not come pre-installed. So head over to Synaptic package manager and search for &quot;xul-ext-light&quot;, select the shown items and install them.<br>
<img src="../assets/images/2016/07/20120316_Fig_8.png" alt="Fig-8" style="width:75%;height:40%;"><br>
Once installed, restart thunderbird and you will see calendar icon and Task Pane.<br>
<img src="../assets/images/2016/07/20120316_Fig_9.png" alt="Fig-9" style="width:75%;height:40%;"><br>
Either click on Calendar or just press
<code>Ctrl+Shift+c </code>
This will open Calendar view as shown below:<br>
<img src="../assets/images/2016/07/20120316_Fig_10.png" alt="Fig-10" style="width:75%;height:40%;"><br>
Select &quot;New Calendar&quot;.<br>
<img src="../assets/images/2016/07/20120316_Fig_11.png" alt="Fig-11" style="width:40%;height:40%;"><br>
Select &quot;On the Network&quot; radio button and click on &quot;Next&quot;<br>
<img src="../assets/images/2016/07/20120316_Fig_12.png" alt="Fig-12" style="width:75%;height:40%;"><br>
Select CalDAV radio button, and fill the location field with <code>http://localhost:1081/users/ankit@officemail.com/calendar</code>.<br>
<mark>Make sure you adjust the port as per your settings of Step 2.</mark><br>
<img src="../assets/images/2016/07/20120316_Fig_13.png" alt="Fig-13" style="width:75%;height:40%;"><br>
Give a name to this Calendar - say Office Cal for instance - and click Next.<br>
<img src="../assets/images/2016/07/20120316_Fig_14.png" alt="Fig-14" style="width:75%;height:40%;"><br>
After this you may be presented with a dialogue box to enter the username and password once again. If so provide details. Here provide <a href="mailto:abc.xyz@officemail.com">abc.xyz@officemail.com</a> and if that does not work and you are presented with the dialogue box again try with just the abc.xyz as username.
Once connected, your Calendar will be in sync as will be your tasks.
<h3 id="step5configureglobaladdressbook">Step 5: Configure Global Address Book</h3>
Open Address Book and then select File &gt; New &gt; LDAP Directory. It will open the following box.<br>
<img src="../assets/images/2016/07/20120316_Fig_15.png" alt="Fig-15" style="width:75%;height:40%;"><br>
Fill as shown below and make sure Port number is as advised in red text. Then Click &quot;OK&quot;<br>
<img src="../assets/images/2016/07/20120316_Fig_16.png" alt="Fig-16" style="width:75%;height:40%;"><br>
That is it. Test and see if you are now able to update your calendar, tasks, emails etc. and if all has gone as explained above you should be good to go.
