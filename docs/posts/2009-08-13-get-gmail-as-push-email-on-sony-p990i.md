---
title: Get Gmail as Push Email on Sony P990i
slug: get-gmail-as-push-email-on-sony-p990i
draft: False
description: Get Gmail as Push Email on Sony P990i
authors: ['ankit']
date: 
  created: 2009-08-13 16:52:00
  updated: 2009-08-13 16:52:00
comments: true
---
While I have moved on from P990i which is now in safe hands of my dear wife, I remember doing some good amount of web searching and still had no idea how to set up push-mail on P990i.

I then thought I will configure a mail anyway and to my surprise the device is capable of enabling push-mail on it`s own as I found while fiddling along. Anyway I have configured push-mail for wifey dear and she was mighty impressed. :smile:

The steps I followed are as below:

<!-- more -->

* Main Menu -> Tools -> Control Panel -> Messaging -> Email Accounts -> New

* Fill Account Name as Gmail

* Your Name as ..well... your name.. :smile:

* Email Address - Your gmail address

* In Connection Type select IMAP from the drop down list.

* Tick on Push email

* Now goto `Inbox` Tab.

* Type imap.gmail.com under `Incoming Server Address`

* Type your email address `xyz@gmail.com` under `Username`

* Enter your `password` under `Password`

* Depending on you data plan you might want to put something else but I have unlimited internet plan so I have selected `No Restriction` under `Download Restrictions`

* Limit number of Emails - I have selected 100, you can chose as per your needs.

* Receive using Group - Select the group of internet account that has your phone provider configured. (I am assuming that you have already configured internet settings on your phone. If not that is a separate topic but you can easily find information on user manual so at the moment let`s consider it as out of scope for this entry.)

* Now goto `Outbox` Tab.

* Type `smtp.gmail.com` under `Outgoing Server Address`

* Tick the checkbox `Use SMTP Authentication`

* Tick the checkbox `Use Inbox Login details`

* Select the same internet group as above under `Send using Group`

* Now click on the arrow next to `Email account` on top of the screen and click on `Advanced` from the dropdown list

* Under `Incoming` tab Select `SSL` under the field `Secure connection`

* Type `993` under field `Incoming mail port`

* Next in `Outgoing` tab under `Secure Connection` filed select `TLS`

* Type `587` under field `Outgoing mail port`

* Tick the checkbox `Use MIME encoding`

* Click on `Save`

* Click on `Save` again

* Now the screen will show Gmail listed as your email account.

* On this screen again click on the arrow next to Email account on top of the screen and select `Always on Pushmail`.

* Tick the checkbox next to `Always On`

* Select the timings and select the phone providers datasetting name under `Internet Account` and click `Save`.

* This is it. You are now all set to receive your mails on the go...

Have fun !!!
