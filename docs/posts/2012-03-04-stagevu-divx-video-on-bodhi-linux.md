---
title: StageVu / DivX video on Bodhi Linux
slug: stagevu-divx-video-on-bodhi-linux
draft: False
description: StageVu / DivX video on Bodhi Linux
authors: ['ankit']
date: 
  created: 2012-03-04 22:25:00
  updated: 2012-03-04 22:25:00
comments: false
categories:
  - Linux
  - Software
---

If you read my last post you will know I have been playing with Bodhi Linux lately. One of the selling point for this distro is it's minimalistic approach. However, that also means it doesn't come with some of the media packages that help stream all type of media - stagevu (DivX) included.

Fortunately it does not require lot of effort to get them all working. At-least for me it was quite quick.

The steps I followed are listed below:

<!-- more -->

* Install non-free codecs:
  
    [http://appcenter.bodhilinux.com/software/showDesc/Non-Free_Codecs](http://appcenter.bodhilinux.com/software/showDesc/Non-Free_Codecs)

* Install dvd codecs:

    [http://appcenter.bodhilinux.com/software/showDesc/Dvd_Playback](http://appcenter.bodhilinux.com/software/showDesc/Dvd_Playback)

* Install VLC Player:

    [http://appcenter.bodhilinux.com/software/showDesc/VLC](http://appcenter.bodhilinux.com/software/showDesc/VLC)

* Install SMplayer:

    [http://appcenter.bodhilinux.com/software/showDesc/SMPlayer](http://appcenter.bodhilinux.com/software/showDesc/SMPlayer)

* Install totem, totem-mozilla, mozilla-plugin-vlc, mencoder using Synaptic Package Manager:

    You can find Synaptic Package Manager under Applications or simply by typing the following command in terminal:
    ```bash
    sudo synaptic
    ```

* Install  divx4linux package:
  
    It can be downloaded from [this link](http://www.mediafire.com/?71fs4c9cy8xy4q4).
    
    Double click on the downloaded file and it will launch the installer.
    
    Once installed, restart the system and then open media sites in firefox and check that the videos are working.
    
    For stagevu though divx4linux should work out of the box on firefox but if not click on 'Tools' > 'Manage Content Plugin' and select divx to play the plugin. Restart browser and that should be it.

Let me know your experiences and tips in comments.
