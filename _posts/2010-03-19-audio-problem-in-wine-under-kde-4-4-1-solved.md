---
title: "Audio problem in Wine under KDE 4.4.1 - Solved"
slug: "audio-problem-in-wine-under-kde-4-4-1-solved"
toc: false
classes: "wide"
date: 2010-03-19T12:43:00
draft: false
description: Audio problem in Wine under KDE 4.4.1 - Solved
last_modified_at: 2010-03-19T12:43:00
---
I was trying to install spotify on linux which used to work perfectly on Gnome and when I tried on KDE it was giving error box. I wrote winecfg on terminal and got following error:
<pre><code>fixme:jack:JACK_drvLoad error loading the jack library libjack.so.0, please install this library to use jack
</code></pre>
After a bit of google I found the answer to be as simple as running this command on terminal:
<pre><code>sudo apt-get install libjack0
</code></pre>
After this audio was working fine. Hope this helps few others.
