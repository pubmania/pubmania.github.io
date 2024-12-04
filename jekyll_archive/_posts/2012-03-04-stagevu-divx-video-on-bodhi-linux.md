---
title: "StageVu / DivX video on Bodhi Linux"
slug: "stagevu-divx-video-on-bodhi-linux"
toc: false
classes: "wide"
date: 2012-03-04T22:25:00
draft: false
description: StageVu / DivX video on Bodhi Linux
last_modified_at: 2012-03-04T22:25:00
---
If you read my last post you will know I have been playing with Bodhi Linux lately. One of the selling point for this distro is it's minimalistic approach. However, that also means it doesn't come with some of the media packages that help stream all type of media - stagevu (DivX) included.
Fortunately it does not require lot of effort to get them all working. At-least for me it was quite quick.
The steps I followed are listed below:
<ul>
<li>Install non-free codecs:</li>
</ul>
<a href="http://appcenter.bodhilinux.com/software/showDesc/Non-Free_Codecs">http://appcenter.bodhilinux.com/software/showDesc/Non-Free_Codecs</a>
<ul>
<li>Install dvd codecs:</li>
</ul>
<a href="http://appcenter.bodhilinux.com/software/showDesc/Dvd_Playback">http://appcenter.bodhilinux.com/software/showDesc/Dvd_Playback</a>
<ul>
<li>Install VLC Player:</li>
</ul>
<a href="http://appcenter.bodhilinux.com/software/showDesc/VLC">http://appcenter.bodhilinux.com/software/showDesc/VLC</a>
<ul>
<li>Install SMplayer:</li>
</ul>
<a href="http://appcenter.bodhilinux.com/software/showDesc/SMPlayer">http://appcenter.bodhilinux.com/software/showDesc/SMPlayer</a>
<ul>
<li>Install totem, totem-mozilla, mozilla-plugin-vlc, mencoder using Synaptic Package Manager:</li>
</ul>
You can find Synaptic Package Manager under Applications or simply by typing the following command in terminal:
<code>sudo synaptic </code>
<ul>
<li>Install  divx4linux package:</li>
</ul>
This can be downloaded from following link:
<a href="http://www.mediafire.com/?71fs4c9cy8xy4q4">http://www.mediafire.com/?71fs4c9cy8xy4q4</a>
Double click on the downloaded file and it will launch the installer.
Once installed, restart the system and then open media sites in firefox and check that the videos are working.
For stagevu though divx4linux should work out of the box on firefox but if not click on &quot;Tools&quot; &gt; &quot;Manage Content Plugin&quot; and select divx to play the plugin. Restart browser and that should be it.
Let me know your experiences and tips in comments.
