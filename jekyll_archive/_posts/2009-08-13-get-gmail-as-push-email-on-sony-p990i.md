---
title: "Get Gmail as Push Email on Sony P990i"
slug: "get-gmail-as-push-email-on-sony-p990i"
toc: false
classes: "wide"
date: 2009-08-13T16:52:00
draft: false
description: Get Gmail as Push Email on Sony P990i
last_modified_at: 2009-08-13T16:52:00
---
While I have moved on from P990i which is now in safe hands of my dear wife, I remember doing some good amount of web searching and still had no idea how to set up push-mail on P990i.
I then thought I will configure a mail anyway and to my surprise the device is capable of enabling push-mail on it's own as I found while fiddling along. Anyway I have configured push-mail for wifey dear and she was mighty impressed...:-)
The steps I followed are as below:
<ul>
<li>
Main Menu -&gt; Tools -&gt; Control Panel -&gt; Messaging -&gt; Email Accounts -&gt; New
</li>
<li>
Fill Account Name as Gmail
</li>
<li>
Your Name as ..well... your name..:)
</li>
<li>
Email Address - Your gmail address
</li>
<li>
In Connection Type select IMAP from the drop down list.
</li>
<li>
Tick on Push email
</li>
<li>
Now goto &quot;Inbox&quot; Tab.
</li>
<li>
Type imap.gmail.com under &quot;Incoming Server Address&quot;
</li>
<li>
Type your email address &quot;<a href="mailto:xyz@gmail.com">xyz@gmail.com</a>&quot; under &quot;Username&quot;
</li>
<li>
Enter your &quot;password&quot; under &quot;Password&quot;
</li>
<li>
Depending on you data plan you might want to put something else but I have unlimited internet plan so I have selected &quot;No Restriction&quot; under &quot;Download Restrictions&quot;
</li>
<li>
Limit number of Emails - I have selected 100, you can chose as per your needs.
</li>
<li>
Receive using Group - Select the group of internet account that has your phone provider configured. (I am assuming that you have already configured internet settings on your phone. If not that is a separate topic but you can easily find information on user manual so at the moment let's consider it as out of scope for this entry.)
</li>
<li>
Now goto &quot;Outbox&quot; Tab.
</li>
<li>
Type &quot;smtp.gmail.com&quot; under &quot;Outgoing Server Address&quot;
</li>
<li>
Tick the checkbox &quot;Use SMTP Authentication&quot;
</li>
<li>
Tick the checkbox &quot;Use Inbox Login details&quot;
</li>
<li>
Select the same internet group as above under &quot;Send using Group&quot;
</li>
<li>
Now click on the arrow next to &quot;Email account&quot; on top of the screen and click on &quot;Advanced&quot; from the dropdown list
</li>
<li>
Under &quot;Incoming&quot; tab Select &quot;SSL&quot; under the field &quot;Secure connection&quot;
</li>
<li>
Type &quot;993&quot; under field &quot;Incoming mail port&quot;
</li>
<li>
Next in &quot;Outgoing&quot; tab under &quot;Secure Connection&quot; filed select &quot;TLS&quot;
</li>
<li>
Type &quot;587&quot; under field &quot;Outgoing mail port&quot;
</li>
<li>
Tick the checkbox &quot;Use MIME encoding&quot;
</li>
<li>
Click on &quot;Save&quot;
</li>
<li>
Click on &quot;Save&quot; again
</li>
<li>
Now the screen will show Gmail listed as your email account.
</li>
<li>
On this screen again click on the arrow next to Email account on top of the screen and select &quot;Always on Pushmail&quot;.
</li>
<li>
Tick the checkbox next to &quot;Always On&quot;
</li>
<li>
Select the timings and select the phone providers datasetting name under &quot;Internet Account&quot; and click &quot;Save&quot;.
</li>
</ul>
This is it. You are now all set to receive your mails on the go...
Have fun !!!
