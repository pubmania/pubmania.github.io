---
title: O2 XDA Serra - Official HTC upgrade with TF3D of Touch Pro 2
slug: o2-xda-serra-official-htc-upgrade-with-tf3d-of-touch-pro-2
draft: False
description: O2 XDA Serra - Official HTC upgrade with TF3D of Touch Pro 2
authors: ['ankit']
date: 
  created: 2009-10-07 17:44:00
  updated: 2009-10-07 17:44:00
comments: true
---
## Background

Ever since I laid my hands on O2 XDA Serra aka HTC Raphael aka HTC Touch Pro , I have always loved the device despite it’s limitations on battery life and have found some really useful apps during my association with windows mobile (for last five years or so) which found their way onto Serra as well. While I have known for a while that we can flash ROMS, I was perhaps over protective when it came to Serra and never really went beyond doing a HardSPL for device but last Sunday when I was fiddling with the facebook application and SMS registration, I realised that each time I sent an SMS and then tried to open the internet explorer or opera they will just crash demanding a soft reset. I could instantly find the problem to be Kaspersky Anti-Virus(KAV) failure. It is not possible to remove KAV without a hard reset at least not to my knowledge. (A hard reset is what brings your device back to factory conditions). Now since a Hard Reset would mean lot of work in terms of reinstalling all my beloved apps etc, I figured I might as well see if there is some other ROM I could use. This is what triggered my quest.

<!-- more -->

What started as fixing the issue caused with a Kaspersky Anti Virus failure rendering crashes to internet browsers on my HTC Touch Pro ended in my pleasantly getting a complete device makeover and in the process making my gadget work way better than it was working before. Lovely GUI, great Facebook integration, faster boot time and most important of all a functional GPS, yes you read it right a functional GPS. The problem that plagued almost all handsets provided by O2.

I must start by saying that if it worked for me it must work for you but if it does not please don’t hold me responsible. Another thing you must know is doing a HardSPL strips your device of the warranty. There is a way of putting back the StockSPL for warranty reasons but I have not tried it but then it does not sound too complicated. You may also find views on forums that suggest installing a cooked ROM is better but as I said I am too much in love with the device to install flaky ROMs I actually opted for the official update ROM released by HTC and then gave it the touchflo3d of touch pro 2 and after some tweaks here and there which I will all list down, I am completely (I stress the word completely) satisfied with the final results.

Ok so now over to the process:

## Objective

1. To install the manufacturer provided ROM
1. To get the handset a good look and feel.
1. Ensure that GPS functions
1. To get phone address book integrated with face-book so you can get your contacts pictures from their FB profile onto your device.
1. To get Weather for the local city that may not be present in the default list.
1. Gmail sync to ensure Gmail is configured as push mail on your device.
1. The Google calendar sync to your on device outlook calendar.

## Pre-requisites

1. A windows PC / laptop.
1. O2 XDA Serra / HTC Raphael / HTC Touch Pro
1. USB cable to connect XDA to PC / laptop
1. At least a 1 GB Mini SD Card. Considering you have XDA, you may want to get a bigger capacity memory card (of up to 8GB or 16GB…). I have a 8GB one.
1. Access to internet.
1. A good data plan that will ensure good use of the effort you are about to put in.
1. Downloaded cabs and ROM. You can either download all in bulk from here ([http://www.mediafire.com/?l12vaj688qwh85w](http://www.mediafire.com/?l12vaj688qwh85w)) (I have uploaded them for ease as a bundle) or follow the links and download individually under each section.
1. and as I always ask, lot of patience.


Steps:
<ol>
<li>HardSPL</li>
<li>Install HTC ROM</li>
<li>Install touchflo3d</li>
<li>Install Dialler</li>
<li>Install .net 3.5 and weather database editor</li>
<li>Configure Device</li>
<li>Configure Email</li>
</ol>

## Step 1: HardSPL

Now to start, we will first need to apply HardSPL to the device. I do not know what the words SPL stand for but what I have come to understand after reading for hours on XDA-developer forums is that if you want to install ROM that is not provided by the vendor who sold you the device (O2 in my case), you will need to apply this HardSPL or you may either not be able to install the new ROM or may even be at risk of bricking your device. HardSPL is not complicated and all credit goes to developers at xda-developer community. You will have official instructions if you follow [this lin](http://forum.xda-developers.com/showthread.php?t=410150)>.

For the sake of completeness, I am anyway including instructions here.

### Instructions:

1. Download Hard-SPL package from attachment, extract to an empty folder. Make sure it's launched from a local drive (not through network drive, etc.)
2. You must Have Phone Synced with PC in Windows Mobile!
3. Run `RaphaelHardSPL-Unsigned_190_1_3.exe`
4. Follow steps in the RUU, check device for prompts after PC shows loading bar.
5. It should go to black screen now.
6. SPL flashes, device automatically reboots, job done.
7. To confirm you got it installed, go into bootloader mode (tricolour screen!) and verify the screen shows `1.90.OliNex`.

!!! note
    1. You will not see the SPL version during normal boot, that is the OS version, not SPL! to enter bootloader mode to see version: with the device turned on, press and hold the volume down button, then press the reset button with the stylus tip, then release the volume down button when bootloader tricolour screen appears.
    2. Anyone having problems with the device entering SSPL automatically, please copy SSPLManual.exe from second attachment to the device and run it. then once the screen is black, run RUU manually. i.e. you run the RUU on the PC, if it isn't obvious.
    3. This is unsigned Hard-SPL. no limitations on flashing ROMs or radio packages. also, this has overwrite protection, if someone needs to revert to stock SPL for warranty reasons, we will soon post a stock SPL downgrade package.
    4. Do not use this RUU for anything other than SPL flashing (i.e. hardspl or stock spl restore)!!! if you want to flash some other rom, then use customruu from: [http://forum.xda-developers.com/showthread.php?t=410761](http://forum.xda-developers.com/showthread.php?t=410761)

## Return to stock spl *(for warranty reasons only!)*

1. Be sure to first restore stock OS, and stock radio. stock SPL is always to be done last!!
2. Download the stock spl package from this post.
3. Also download the original hardspl from the attachments in this post.
4. Run the hardspl exe but do not click anything in RUU yet. just let the hardspl EXE extract the files for flashing.
5. The SPL you want to revert to is a .NBH file, put the NBH in the extracted hardspl package, overwriting the original NBH file in it!
6. Continue with the RUU (or if needed, run SSPL-Manual.exe manually, then run RUU when it goes to black screen), it goes to 100%, reboots, done.
7. To verify, volume down + reset, see version number on tricolour screen, should now just say 1.90.0000.</li>

## Step 2: Install HTC ROM

Straight forward really. Connect your phone to the PC through the USB cable. Ensure that a connection is established with pc through active sync. Now double click on the ROM update utility (RUU) (RUU_Raphael_HTC_Europe_5.05.401.1_R2_Radio_Signed_Raphael_52.58.25.30_1.11.25.01_Ship) and it will guide you through the process.

If you want to directly download from HTC you can do so from [this link](http://www.htc.com/uk/SupportDownload.aspx?p_id=140&amp;cat=2&amp;dl_id=501)

You will have to use the non-O2 serial number. The one I used was HT833K016924.

!!! note "Side Note"
    Now if all went well what follows is the non-risky bit. To be honest I don’t even understand why we have to do this but then that’s the process and I was not about to experiment on my lovely instrument based on my limited knowledge led beliefs so I did this nonetheless.

Once completed it will restart XDA. Once it reaches the screen where it asks to configure Stylus, do a Hard Reset by pressing the Volume down key and the enter key (Round centre key) simultaneously and pressing the reset key with your stylus. (Reset Key is a small hole at the bottom of your handset next to the charging slot.) Once the system switches off release the reset key but continue to hold Volume Down key and enter key.

It will now show a screen cautioning you that if you continue it will result in loss of data and if you wish to continue press Vol Up key. Press the Vol up key now. I don’t distinctly remember but I think it asked me twice to press Vol Up which I did. Basically just follow the instructions.

That should sort out the new ROM installation.

Now at this stage, you would have got rid of the O2 splash screen which has given way to elegant Touch Pro splash screen. This itself was an extreme form of happiness as I was not a huge fan of the O2 splash screen anyway. Ok you may want to take a moment with the new screen and play around. If you are happy and are not overly worried about facebook integration, I will recommend that you skip to Step 5. If however you want FB integration and would want a more Touch Pro 2 kind of interface there is still some work to be done. Moving on, then to Step 3.

## Step 3: Install touchflo3d

``` title="text borrowed from XDA-developer website"
http://forum.xda-developers.com/showthread.php?t=542113
Instructions
1) Disable "TouchFLO 3D" from your Today items. Soft reset.
2) Go to System Settings, "Power", and uncheck all of the Options on the "Advanced" tab.
3) Install the "Gen.Y_Manila_R1_5.cab" (install may take 10 minutes or more). DO NOT RESTART.
4) Install Language Pack cab 0409 Gen.Y_Manila_R1_5. DO NOT RESTART.
5) Install the HTC Scroll_1_0_1914_2726 cab file. NOW SOFT RESET.
Done!
```

I did not install anything in the optional installs but if you would want to, you can follow the instructions on the post by Captain Throwback on the link above. The version I downloaded was R1.5 which is included in the pack.

## Step 4: Install Dialler

I downloaded the dialler from ppcgeek forums, many thanks to them. It is not available on the link provided in xda-developer post. If you want to download from there, you will have to register on their site and do a bit of googling. Alternatively, it is included in the pack above, just the non confusing cab file named - .

Move it to your memory card on phone. Now from XDA go to the location where you saved it and click the cab to install it. It will take about 3 to 5 minutes.

## Step 5: Install .net 3.5 and weather database editor

Copy the < NETCFv35.wm.armv4i> cab(.net 3.5) and < WeatherDatabaseEditor 1.1 Modified> cab(weather DB) onto the memory card on your device. Now first install .net 3.5 by clicking the cab file from the location where you copied it.

To install weather DB follow the steps below:

1. Install Weather Database Editor

2. Find your locCode on [http://www.accuweather.com](http://www.accuweather.com).       
   
    !!! example
        Accuweather URL for Northwich in UK is : [http://www.accuweather.com/world-index-forecast.asp?partner=accuweather&amp;traveler=0&amp;loccode=EUR|UK|UK123|Northwich](http://www.accuweather.com/world-index-forecast.asp?partner=accuweather&amp;traveler=0&amp;loccode=EUR%7CUK%7CUK123%7CNorthwich), The locCode is EUR|UK|UK123|Northwich

3. Now open the weather DB on XDA, select your country and then select a city that begins with the same alphabet as your city and the one you are unlikely to use. For this example lets say - Nuneaton. Click on Edit -> Edit City.<br>

4. Now change the name of city to the one you want and in “Accu Weather Code” Field enter the locCode obtained in Step 5.2. For our example it would be - EUR|UK|UK123|Northwich<br>

5. Click on File and exit.<br>

6. Go to Weather tab and add your city and update the weather.
   
    !!! site-tip "Tip"
        Steps 7 to 9 are not relevant to you if you directly jumped to this section from Step 2 and have not installed the new TF3D

7. Go to home page on XDA and click on watch, now click on “Add City” and add the local city.
8. Make this as your default city by clicking the radio button.
9.  Now click on Menu-> Rearrange Cities and bring your local city to top of the list.

This is it, we will now move to next step.

## Step 6: Configure Device

Many people don’t care to update the owner details but I think it is important to have that updated and hence my first step when I am done with initial installations and all is to update owner details. This ensures that if phone is lost and lands in honest hands you still have a chance of getting it back. It did happen to me so it isn’t a fairy tale…J

Click on Windows icon -> Settings-> All Settings ->Personal -> Owner Information and update these details. Ensure that the telephone number you enter is different than the one for this instrument else it pretty much defies the purpose of entering this information on the first place.

Next give your XDA a name. Click on Windows icon -> Settings-> All Settings -> System -> About. -> Device ID. Update your device name and description.

Personalise weather updates. Slide over to weather, add any other cities you are interested in and click update now.

!!! site-tip "Tip"
    I recommend that you install registry editor through the cab file provided in my bundle named and a file Explorer named but these are completely optional
    
Your basic configuration is now complete.

## Step 7: Configure Email

If you use hotmail or live and you have a good data plan (mine is unlimited internet usage) it may be a good idea to configure windows live as that ensures push mail so you have instant delivery of your mail as soon as it arrives into your handset.
To do this, Click on Windows icon -> All Programmes -> Windows Live. Enter details and configure.

!!! site-tip "Tip"
    Ensure that you change sync settings from “Manual” to “As soon as it comes” and the time schedule according to your needs.

Gmail has recently introduced Gmail Sync that can sync your email, calendar and address book. They have provided instructions but they were not exactly mapping to how it was shown on my device. I instead used the following route.

Connect your phone to your PC / laptop through ActiveSync and open Device Centre. Now click on Setup device -> Sync Setup and in server name enter m.google.com. enter your username and password. The SSL checkbox is clicked by default so let it remain. If it is not checked, please select it in the checkbox.

Save settings. Now under items to be synced, of the three : email, calendar and address book select whichever you want synced…(Remember if you set anything other than these three to be synced through exchange nothing will work on Google Sync).

I did not want my address book sync with Gmail so I left it and for other two I changed the sync settings to Exchange server. This is it your email will now be delivered into outlook mailbox on your XDA. You may want to check in your Gmail settings that you have activated IMAP or else even though this setup is correct you will not get mails delivered.

Congratulations on successful completion of the whole process. Now enjoy the new look XDA with enhanced capabilities!!!
