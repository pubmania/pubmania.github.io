---
title: Audio problem in Wine under KDE 4.4.1 - Solved
slug: audio-problem-in-wine-under-kde-4-4-1-solved
draft: False
description: Audio problem in Wine under KDE 4.4.1 - Solved
authors: ['ankit']
date: 
  created: 2010-03-19 12:43:00
  updated: 2010-03-19 12:43:00
comments: true
---
I was trying to install spotify on linux which used to work perfectly on Gnome and when I tried on KDE it was giving error box. I wrote winecfg on terminal and got following error:

!!! failure "Error"
    fixme:jack:JACK_drvLoad error loading the jack library libjack.so.0, please install this library to use jack

<!-- more -->

After a bit of google I found the answer to be as simple as running this command on terminal:

```bash
sudo apt-get install libjack0
```

After this audio was working fine. Hope this helps few others.
