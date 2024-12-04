---
title: Linux Mint on Android through VNC and Jump
slug: linux-mint-on-android-through-vnc-and-jump
date: 
  created: 2013-03-17 13:37:00
  updated: 2013-03-17 13:37:00
draft: False
description: Linux Mint on Android through VNC and Jump
authors: ['ankit']
comments: true
---

Today "Jump" was available for free on Amazon as the app of the day and since it's nearly 7 quids on google play store, I grabbed it. For windows and Mac users, they have a pretty straight forward set-up but as usual for Linux it means some work but, in the end, it leaves you with a set-up you can trust and feel secure about. 

<!-- more -->

## Set-up x11vnc and ssh servers

Linux Mint machine should be set-up for x11vnc and ssh servers

### Install VNC 

Install X11VNC by typing following command in terminal:

```bash
sudo apt-get install x11vnc
```

### Configure VNC

Create a password for VNC Using following command in terminal and providing a password and answering yes for the prompt to store password in a file.

```bash
x11vnc -storepasswd
```

Now to ensure that X11VNC starts at boot go to menu and type start, click on startup application as shown in the screenshot below:

![Fig-1](../assets/images/2016/07/20130317_Fig_1.png)

Then in the window that this will open click on "Add" and enter a "Name" and in "Command" field paste the command below: 

```bash
x11vnc -forever -xkb -usepw -display :0
```

![Fig-2](../assets/images/2016/07/20130317_Fig_2.png)<br>

VNC set-up on machine is complete.

### Install openssh

Install openssh-server using following command on terminal:

```bash
sudo apt-get install openssh-server
```

### Configure openssh

We will need to change some parameters in ssh configuration for making it secure as by default it allows root login but I dont want that for remote access and would advice most regular users to do so as well. 

* So we will first make a backup of existing configuration file using the command below:
    ```bash
    sudo cp /etc/ssh/sshd_config ~
    ```

* Now, we will edit the actual config file using following command:
    ```bash
    gksudo gedit /etc/ssh/sshd_config
    ```

* Once the file is open ==change the parameter "PermitRootLogin" to "no".== *It's on line 27 for me.*

* Now, the default port for ssh is 22 but I recommend changing it to something else such as 5432. 
* To do so change the parameter "Port" from 22 to whatever port you want to put. In this example it will be 5432. *For me "Port" parameter is on line 5.*
* Save the changes and close gedit.

* Now we will restart the ssh server using following command in terminal
    ```bash
    sudo restart ssh
    ```

* For Arch, you can use the command:
    ```bash
    sudo systemctl start sshd
    ```
    followed by
    ```bash
    sudo systemctl enable sshd.service
    ```
    to ensure ssh daemon is enabled at startup.

* Restart the machine and machine set-up is done.

## Configure Router firewall

Router firewall should be configured to allow inbound traffic on specific ports. This may involve different steps from those given below depending on the router in use. Following steps are meant for configuring the sky router. However, principle is same. We will be creating specific service definition and port on router and then create a firewall rule that allows inbound traffic and directs it to Linux machine we configured above.

* Type following command on terminal:
    ```bash
    ifconfig
    ```

* This will list lot of numbers, what we are interested in is the number just after "inet addr:" under wlan0. *It will be something like 192.168.0.10.*

* Open sky router config through browser using 192.168.0.1 and click on "Security". You will need to enter router username and password.
    
    ![Fig-3](../assets/images/2016/07/20130317_Fig_3.png)

* Then click on "Services" and then click on "Add Custom Services".

* Enter as shown in Figure 4 and Start Port as 5900, Finish Port as 5900 and click on "Apply".
    
    ![Fig-4](../assets/images/2016/07/20130317_Fig_4.png)

!!! site-tip "Tip"
    `5900` is default port for `display 0` in VNC. If you have changed it like me you will need to enter that port. To change port you will need to use `x11vnc -forever -xkb -usepw -autoport nnnn -display :0` option in third step of VNC config above. This is not required for security but in case you have two different machines then this approach will come handy.

* Now click on "Add Custom Services" again and this time enter as shown in next screenshot. Start Port and End Port should be same as entered in step 1.8, so for this example it will be 5432. Then click on "Apply".
    
    ![Fig-5](../assets/images/2016/07/20130317_Fig_5.png)

* Now we need to set the firewall for these services. To do so, click on "Firewall Rules" then click on "Add" under inbound services.
* Configure fields as shown in next screen-shot below and click on "Apply".
    
    ![Fig-6](../assets/images/2016/07/20130317_Fig_6.png)

* Now we will do same for SSH, so again click on "Add" under inbound services and configure fields as shown in screen-shot below and click on "Apply".
    
    ![Fig-7](../assets/images/2016/07/20130317_Fig_7.png)

* Click on "Apply" under "Inbound Services".

* In browser on the router management page, click on "Advanced" &gt; "Remote Management" and on this screen make note of the IP address (number after http:// in red box in next screenshot) shown under "Remote Management Address".
    
    ![Fig-8](../assets/images/2016/07/20130317_Fig_8.png)

* Go to [https://www.dlinkddns.com/signin](https://www.dlinkddns.com/signin) and create an account. Refer [this page](http://www.dlinkddns.com/howto) for the how-to and you will need to use the IP from step above as the host. At the end of it you will have a hostname like "yourname.dlinkddns.com", username and password for logging in to dlinkddns site.

* Once this is done, go to the browser with sky router management and click on "Advanced"&gt;"Dynamic DNS" and fill as shown in screen-shot below:
    
    ![Fig-9](../assets/images/2016/07/20130317_Fig_9.png)<br>

    ```bash linenums="1"
    Host Name: Hostname from Step above (yourname.dlinkddns.com in this example)
    User Name: D-Link site username
    Password: D-Link site password
    ```

    ![Fig-10](../assets/images/2016/07/20130317_Fig_10.png)

* Once above information is filled, click on "Apply" and then click on "Show Status". It should open a separate window and showing the message "request successful".

Sky Router is now configured.

## Jump or an equivalent VNC viewer should be configured on the android device.

1. On the android device open Jump and click on the "+" sign in right hand corner.
2. In the "Address" Field enter the hostname from 2.12 (`yourname.dlinkddns.com` in this example) and select connection type as "VNC" and click save.
3. Change the "Authentication Method" to "VNC Password"
4. Tap on "SSH Tunnel", click on "Enabled" checkbox.
5. In Username enter the username used to log into the machine configured above in Step 1.
6. In Host Name, use the the hostname from 2.12 (yourname.dlinkddns.com in this example)
7. Change the port to one used in 1.8. So in this case 5432.
8. Password can be left empty and when asked during connection provide the one used to log on to the machine with this username.
9. Press back button and click on entry. You will be shown a SSH key notification, say ok. Then you will be asked for a password, provide the password you use to log onto your machine with the username provided in 3.6.
10. Then you will be asked for the VNC password, provide the password from step 1.2.

You will now be able to view your desktop on your android machine.

![Fig-11](../assets/images/2016/07/20130317_Fig_11.png)
![Fig-12](../assets/images/2016/07/20130317_Fig_12.png)

All Done !!!
