---
title: "Google Voice + SIP2SIP + Ikall = Free international Calls to known contacts"
slug: "google-voice-sip2sip-ikall-free-international-calls-to-known-contacts"
toc: false
classes: "wide"
date: 2011-02-20T15:32:00
draft: false
description: Google Voice + SIP2SIP + Ikall = Free international Calls to known contacts
last_modified_at: 2011-02-20T15:32:00
---
Second post in succession on the topic but believe me when I get a new gadget I try getting all information and then once I have had the stuff working I have to make a post right away or I will forget and hence this post. This post also overrides the previous posts.
Right then, let's get down to business.
<strong>What do we aim to do?</strong><br>
We aim to make free international calls and there is nothing illegal in this set-up, not to my knowledge.
<strong>How?</strong><br>
Google has introduced Google Voice and allows free calls to all US numbers. This can be done using their google talk plugin in the gmail browser.
<strong>Pre-Requisites:</strong>
<ul>
<li>Gmail account Preferably a new one and not the one you use for your day to day usage.</li>
<li>Ability to install X-Lite 4.0 which will require a machine running Windows PC directly or on virtualbox.</li>
<li>Ability to install Hotspot Shield if residing outside of USA.</li>
<li>An Android device at both source and destination of the call.</li>
</ul>
<strong>Steps:</strong>
<ol>
<li><strong>Get a SIP number.</strong></li>
</ol>
If outside of USA, install hotspot shield on windows machine by going to this site - <a href="http://www.hotspotshield.com">http://www.hotspotshield.com</a> .I am not sure how safe this is from spyware and all security perspective.  I am not really worried about it as I carry out these things on virtualmachine using virtualbox and there is no real threat to my actual machine which runs  on Linux. So if Windows is your primary machine you do it on your own risk.
Once installed, open the site www.sip2sip.info.Register on sip2sip using your new gmail account. Ensure that you select US Central as your region.
You will get an email from sip2sip on the new gmail account giving your login details which will be something like:
<pre><code class="language-note_black">SIP address: 2233xxxxxx@sip2sip.info
Password: abcdabcdabcd
</code></pre>
Open the email and click on the link provided for lgging in. Enter the login details provided and goto settings tab (3rd from left).
In the first field under SIP Account, enter a new easy to remember password and click <code>SAVE</code>.
This completes Step 1 and you have successfully created SIP number for yourself.
<ol start="2">
<li><strong>Get a US phone number using ipkall.</strong><br>
Go to the website <a href="http://www.ipkall.com">http://www.ipkall.com</a> and click on sign-up.On the sign-up page complete the following details using the email from sip2sip:</li>
</ol>
<pre><code class="language-note_black">SIP username:  2233xxxxxx
Hostname or IP address: sip2sip@info  
Email Address: Preferably the email address you used to register at sip2sip
Password: Prefereably the same password as what you changed on sip2sip in Step 1-5.
Enter the human verification codes and click &quot;Submit&quot;.
</code></pre>
You will receive a mail with in your email account with a new US number with text of something to following effect:
<pre><code class="language-note">Thank you for signing up. Your IPKall phone number is: 253-XXX-XXXX.
SIP Phone Number: 2233xxxxxx
SIP Proxy: sip2sip.info
Email: abcdefg@gmail.com
Password: qwerty
</code></pre>
This completes Step 2. You have now received a US phone number that is linked to your sip2sip account.
<ol start="3">
<li><strong>Set-up Xlite / softphone to receive calls made to US phone number.</strong></li>
</ol>
In order to activate Google Voice account, it is important to be able to receive call on the new phone number that we have created in Step 2 so install Xlite v4.0 from here - <a href="http://download.cnet.com/X-Lite/3000-2349_4-10547103.html">http://download.cnet.com/X-Lite/3000-2349_4-10547103.html</a>
Once X-Lite is installed, open it and click on Softphone -&gt; Account Settings. Now fill the following fields:
<pre><code class="language-note_black">Account Name: Fill your gmail username.
User ID: 2233xxxxxx
Domain: sip2sip.info
Password: sip2sip password (qwerty for this example)
</code></pre>
Click OK at the bottom of the window. This completes Step 3.
<ol start="4">
<li><strong>Activate Google Voice for this Gmail account.</strong></li>
</ol>
<ul>
<li>Log into the google voice account - <a href="https://www.google.com/voice">https://www.google.com/voice</a>.</li>
<li>Provide a user pin to retrieve voicemails</li>
<li>Now provide the US phone number obtained in Step 2-4 (253-XXX-XXXX)</li>
<li>A window will be shown with two numbers and a button call now.</li>
<li>Click on Call Now and you should receive call on Xlite phone.</li>
<li>Accept the call on Xlite and enter the two numbers shown in google's window.</li>
<li>You will get confirmation that the numbers are correct and will be asked to set-up voice mail greeting or hang-up.</li>
<li>Hang-up now as you can set this up later.</li>
</ul>
Google Voice account is now set-up.
<ol start="5">
<li><strong>Configure Android to receive calls using Google Voice.</strong></li>
</ol>
If you are using nexus S, good news, it has inbuilt capability to get the SIP calls though this can be also be done using SIPDROID on other android devices. For Nexus S you can follow the steps below:
<ul>
<li>Goto Settings -&gt; Call Settings and under Internet Call Settings click on &quot;Accounts&quot;.</li>
<li>Untick receive calls.</li>
<li>Click on Add Account.</li>
<li>Now in username enter the 2233xxxxxx provided by sip2sip</li>
<li>Enter the password used for sip2sip account in password field. (qwerty in this example)</li>
<li>Enter sip2sip.info in server.</li>
<li>Untick the &quot;Set as primary account&quot; field.</li>
<li>Click on Optional Settings and in Outbound proxy address enter proxy.sipthor.net</li>
<li>Press back button till you are back to call settings. Now under Internet Call Settings click on &quot;Use Internet Calling&quot; and select &quot;Only for Internet Calls&quot;.</li>
</ul>
For  SIPDROID once you have downloaded and installed it from android market, follow the steps below:
<ul>
<li>Open SIPDROID, and goto Settings -&gt;SIP Account.</li>
<li>In Authorization Username enter: <a href="mailto:2233xxxxxx@sip2sip.info">2233xxxxxx@sip2sip.info</a></li>
<li>Enter the password used for sip2sip account in password field. (qwerty in this example)</li>
<li>In Server or Proxy enter proxy.sipthor.net</li>
<li>In Domain enter sip2sip.info</li>
</ul>
Now save and exit. SIPDROID will register the VOIP and turn green.
Now from gtalk plugin in the browser from some other gmail account try to call US phone number obtained in Step 2-4 (253-XXX-XXXX). Your phone should ring and so should the Xlite.
If step 4 did not happen as expected, you need to review the configuration and once it does happen as expected, your set-up to recieve calls is completed.
<ol start="6">
<li><strong>Configure Android to make calls using Google Voice.</strong></li>
</ol>
<ul>
<li>Download and install Google Voice Callback on android device - <a href="https://market.android.com/details?id=com.xinlu.gvdial&amp;feature=search_result">https://market.android.com/details?id=com.xinlu.gvdial&amp;feature=search_result</a></li>
<li>Provide the gmail credentials for the application. This will perhaps explain my recommendation for a new gmail account. You will be giving login credentials to a third party application but since it's a new account with no confidential info, it should really be safe.</li>
<li>In the settings for when to use callback select &quot;Ask Everytime&quot; if you are outside of USA.</li>
</ul>
This is it. Try calling one of your USA contact and this application should make a call back and you should be able to talk for free to your US friends.
This is happy ending for those who don't have sight of our aim - make free international calls. For free international calls though you have reached a point where you will have dependency on person you are calling. Following 3 options will be possible:
If the person you are calling also has android device and they follow this tutorial they will have a US number which you can then store in your contacts against that person's name and from thereon you both can call each other absolutely free.
If your friend has a SIP enabled device, they can follow this tutorial and replace the set-up of Android device to setting up their own SIP device.
If above two are not viable options, you can ask your friend to call you on your international number through googletalk plugin in their web browser. Unfortunately this takes away the flexibility of you being able to call them but given the constraints this may still be a good option to talk for free.
<blockquote>
Final words - I know it's a long post and looks complex but believe me if you do it right it takes roughly 20 minutes.
</blockquote>
Hope you find the post helpful.
