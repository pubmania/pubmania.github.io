---
title: "DDCLIENT set-up on Fedora for Namecheap"
slug: "ddclient-on-fedora-2"
toc: false
toc_label: 'Steps:'
classes: "wide"
date: 2016-07-20T16:11:45
draft: false
description: DDCLIENT set-up on Fedora for Namecheap
last_modified_at: 2016-07-20T16:11:45
---



<h1 id="configurenamecheap">Configure Namecheap</h1>
Follow the Namecheap guide <a href="https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns">here</a>

**NOTE:** For a subdomain "oxygen.copper.com", just replace @ with "oxygen"
{: .notice--tip}

<h1 id="setupddclient">Set-up DDCLIENT</h1>

```bash
#Install DDCLIENT on Fedora
sudo dnf install ddclient
#Edit the configuration file to update IP on your Dynamic DNS host
sudo nano /etc/ddclient/ddclient.conf
```

Press <code>Ctrl+W</code> and type the name of host for your Dynamic DNS. Mine is with Namecheap and I needed to configure for the subdomain hence following config reflects how to do it for Namecheap. For other hosts, you will need to refer their documentation.

```html
## NameCheap (namecheap.com)
use=web, web=dynamicdns.park-your-domain.com/getip
protocol=namecheap, \
server=dynamicdns.park-your-domain.com, \
login=copper.com, \
password=&lt;copy the password from namecheap advanced DN section&gt; \
oxygen
# myhost.namecheap.com
```

<hr>
![](../assets/images/2016/07/advanced-dns-3-6-2016-171.png)

The password to be provided above is what you will find on namecheap dashboard (Ref. Screenshot above).

* Log in to the namecheap account.
* Go to Advanced DNS
* Scroll down to Dynamic DNS section
* Copy the password
* Paste in ddclient config file
<hr>

<h1 id="testddclient">Test DDCLIENT</h1>

Before we schedule ddclient to run at boot, we need to test if it has been configured properly and is able to communicate with Namecheap by `sudo ddclient -daemon=0 -debug -verbose -noquiet`. If it is configured properly, you will see a message similar to this as part of the final output.

```bash
SUCCESS: updating oxygen: good: IP address set to 92.117.273.56
```

If it is not what you see, and more importantly, if you do not see last line as "Success", then there is something wrong with configuration and you must correct it before proceeding.

If this test worked, we are ready to update the DDCLIENT service.

<h1 id="setupddclienttorunatstartup">Set up DDCLIENT to run at start-up</h1>

When we install ddclient using dnf, a ddclient.service file is automatically created in the location `/etc/systemd/system/ddclient.service` with following content.

```bash
[Unit]
Description=A Perl Client Used To Update Dynamic DNS
After=syslog.target network.target nss-lookup.target

[Service]
User=ddclient
Group=ddclient
Type=forking
PIDFile=/var/run/ddclient/ddclient.pid
EnvironmentFile=-/etc/sysconfig/ddclient
ExecStartPre=/bin/touch /var/cache/ddclient/ddclient.cache
ExecStart=/usr/sbin/ddclient $DDCLIENT_OPTIONS

[Install]
WantedBy=multi-user.target
```

We will enable and start this service by issuing following commands:

```bash
sudo systemctl enable ddclient.service
sudo systemctl start ddclient.service
```

One would think that enabling and starting this service is all you need to do but that is not usually the case. I was getting following error:

/bin/touch: cannot touch `/var/cache/ddclient/ddclient.cache': Permission denied
{: .notice--error}

A quick google search establishes that there seems to be some bug in how the ddclient cache file is created and how the permissions are set. After lot of searching, scratching head later, I did the following which fixed the issue. So if <code>sudo systemctl start ddclient</code> results in error, you may need to do the following:

{% highlight bash linenos %}
#Go Root
su
#Create a directory for ddclient
mkdir /var/run/ddclient
#Chown the various directories for ddclient as user
chown ddclient:ddclient /etc/ddclient.conf
chown ddclient:ddclient /var/run/ddclient/
#change directory
cd /var/run/ddclient
#delete ddclient.cache if it exists
rm ddclient.cache
#change directory
cd /etc/sysconfig
#delete ddclients.cache
rm ddclients.cache
#create a blank ddclient.cache
nano /var/run/ddclient/ddclient.cache
#chown it for ddclient user
chown ddclient:ddclient /var/run/ddclient/ddclient.cache
#exit root
exit
#enable and start ddclient service
sudo systemctl enable ddclient.service
sudo systemctl start ddclient.service
{% endhighlight %}

Done !!!

<h1 id="knownissuewithddclient">Known Issue with DDCLIENT</h1>

There is a known issue and I can confirm that I have seen on my logfile as recently as today.

WARNING: cannot connect to dynamicdns.park-your-domain.com:80 socket: IO::Socket::INET: Bad hostname 'dynamicdns.park-your-domain.com'
{: .notice--error}

It isn't major but it is there and restarting the service by issuing the command `sudo systemctl restart ddclient.service` fixes the problem.
 