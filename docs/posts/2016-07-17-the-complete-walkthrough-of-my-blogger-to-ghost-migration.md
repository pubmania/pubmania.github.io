---
title: The complete walkthrough of my blogger to ghost migration
slug: the-complete-walkthrough-of-my-blogger-to-ghost-migration
date: 
  created: 2016-07-17 22:39:07
  updated: 2018-03-29 15:37:53
draft: False
description: The complete walkthrough of my blogger to ghost migration
authors: ['ankit']
comments: false
categories:
  - Linux
  - Software
  - Troubleshooting
  - Network Setup
  - Server Setup
  - Development
  - Blogging
---

## The 7 Year Itch

It can't possibly be a coincidence that this is the 7th year since I started blogging on blogger and therefore it is very likely to be a strong case of the 7 year itch syndrome but whichever way you look at it, divorce was inevitable given blogger had just stopped inspiring me.

I have been fiddling with different blogging platforms <em>while getting accused of neglecting my sweet and loving family...😢</em>. Ghost caught my fancy three weeks back. The last post was the beginning of our courtship and this post tells the tale of how a casual fling turned into marital commitment. 😂

To start a fresh blog, choosing any platform is easy and straight forward but to move from one platform to another is - umm... lets just say a very involved process - rewarding but involved.


## Love can move mountains!!!

A complete migration from blogger to WordPress would have been way simpler. I know this as I have done it in past and it appeared like moving to Ghost would require migrating to a WordPress instance anyway. There was - I must admit - a temptation to call WordPress the home but that wouldn't have made a great love-story now - would it?

However, the much publicised WordPress route to Ghost migration did not work for me and eventually after a lot of manual copying, pasting, cleaning, pruning, hiding, reading and learning later, the self-hosted blog is all complete.

<!-- more -->

### Install Ghost
This is covered in my last [post](./2016-07-01-ghost-on-fedora-24.md). Once it was installed, I took some time exploring and learning Markdown.
Last post was my first one using Markdown and it was a very pleasing experience indeed. That nice experience paved way as well as helped me finalise the decision to go the whole nine yards.

### Install a theme
There are some very beautiful themes available on [Ghost Marketplace](http://marketplace.ghost.org/themes/free/). I have used the theme called [scrawl](http://ktweeden.github.io/scrawl) and then tweaked it a bit.

Once I found the theme I liked, I downloaded the zip file, unzipped it and deleted the zip file like so.

```bash linenums="1"
#Download
curl -L https://github.com/ktweeden/scrawl/archive/master.zip -o master.zip
#unzip
unzip -o master.zip
#Delete zip file
rm master.zip
#restart Ghost
pm2 restart Ghost
```

Theme is now installed.

### Configure the theme

<ol>
<li>The first thing I wanted to configure on my new theme was the code block. Prismjs is the way to go and it is already included in the theme I downloaded but the line numbering was not there. After reading a bit on PrismJS website, I understood that core css file from prism did not have this and also I wanted the dark theme so I downloaded the 'okadia' theme css along with line number plugin.</li>
</ol>
I then replaced the content of `/var/www/html/site-name/content/themes/scrawl-master/assets/css/prism.css` with the content in downloaded CSS.
<ol start="2">
<li>Next thing I wanted to change was the header background colour and also the link colour. While it was very close to what I wanted, my actual liking is for the colour #F2C20F and a bit darker link colour #B710EF. To do this I edited the _global_styles.scss like so:</li>
</ol>

```bash linenums="1"
#change directory
cd /var/www/html/site-name/content/themes/scrawl-master/sass/partials 
/#Edit _global_styles.scss
nano _global_styles.scss 
```

Now change the colour of $primary-colour and also add $link-colour. After this your /* Colour */ section will look as shown below:
```css title="_global_styles.scss"
/* Colours */
$primary-colour: #F2C20F;
$secondary-colour: #254E70;
$tertiary-colour: #FF4B3E;
$font-colour: #011627;
$background-colour: #EFEFEF;
$link-colour: #B710EF;
```

Then I changed directory using `cd /var/www/html/site-name/content/themes/scrawl-master/assets/css` and opened `index.css` and `post.css` where I changed the background-color property to #F2C20F as shown below:

=== index.css

    ```css
    /**
      MIXINS
    **/
    .blog-title-background {
      background-color: #F2C20F;
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column; }
    ```
=== post.css

  ```css
  /**line 86/434 (19%), col 22/29**/
  .blog-title-background {
    background-color: #F2C20F;
    width: 100%; }
  ```

### Enable commenting on the blog with DISQUS

Using DISQUS to enable comments is extremely simple especially on [scrawl](https://github.com/ktweeden/scrawl) - the theme I have used and is as explained under the DISQUS section of the theme website:

To enable commenting:

<ul>
<li>I created an account on Disqus.</li>
<li>Then I created a 'channel' for this blog in DISQUS using steps below:</li>
<li>Open [DISQUS](https://disqus.com/) and click on 'Get Started' to sign-up</li>
<li>Once the sign-up was completed, email verified etc, I went to [channels link on home page of disqus](https://disqus.com/home/channels/) and created a channel say `thetestchannel`</li>
<li>Copied the following code into the blog header code injection:</li>
</ul>

```javascript
<script>window.__themeCfg.disqusUsername = 'thetestchannel';</script> // (1)
```

1. `thetestchannel` must be replaced with the name of the channel created on DISQUS.


### Migrate content from blogger

Now, this was the most painful of all the things I had to do - ***the moving of mountain if you like*** - because the automated solution using [Blogger2Ghost](http://www.blogger2ghost.com/) just wouldn't work for me. So I, basically, copy pasted most of the content from blogger over to Ghost and placed the various screenshots manually.

If my posts were in 3 digits, I would have persevered and tried contacting someone for help but as it was relatively less content, I just went ahead and did it manually and am glad I did so because that way I was able to do a bit of clean-up too.

### Redirect Traffic from old blog

There are a huge number of posts on www for 301 redirect and what not but I felt, it is only fair to let the redirects land on old blog and users be told there of the new destination so like last step, I manually updated the posts on blogger to just let the reader know that the post they are looking for has moved to new location and link for that post on new site.
Not most elegant and efficient approach but I am happy that way.

!!! warning
    If there are huge entries and one still has to go the manual route, it will save a lot of pain if the permanent link for new posts on Ghost is same as that on old blog and this can be achieved by clicking on clog next to "Save Draft" on the post and changing the "Post URL"
	

### Migrate comments from old blog

Migrating comments from blogger to DISQUS is very easy.

* I opened the blogger importing tool which can be accessed using a URL similar to this - `https://thetestchannel.disqus.com/admin/discussions/import/platform/blogger/`

However, getting them reflected on new ghost instance has three approaches dependent on the route one takes for redirecting from old blog. As I chose no redirection as such, I had to go for a CSV mapping file between my old and new blog URL per post.

Once again, for the number of posts I have this was not a challenge at all but I can't imagine doing such a thing for a big content transfer and it may be worth paying attention to the note in step above if one has huge content to transfer as it will reduce the pain for comments transfer.

### Enable Search for your blog

Ghost recommends Swifttype and the popular site [Ghost for beginners](https://www.ghostforbeginners.com/how-to-add-a-search-box-to-your-ghost-blog/) provides guidance for Google CSE (Custom Search Engine). I did not like the idea of paying for Swifttype for my small site and Google Search Engine was taking it's sweet time to crawl my site - unlike in past now we cant order / request a crawl and there was ofcourse Google Custom Search watermark which I am not all that fond of.

!!! success
    I updated the theme I am using to include search feature.

	

### Enable Social Links<
This is, much like many other customisations I did, a very theme specific step and for the theme I have chosen it is fortunately very easy to achieve except for linkedin and google+ for which I had to add few lines of code. I achieved this using steps below:

* Adding already available social icons is very simple and most of the social links are actually available out of the box. So for Tumblr and Instagram all I had to do was open the admin panel of Ghost, click on Code Injection link and paste the following two lines replacing `yourusername` with my username on that platform.

```javascript linenums="1"
<script>window.__themeCfg.tumblrUsername = 'yourusername';</script>
<script>window.__themeCfg.instagramUsername = 'yourusername';</script>
```

* For LinkedIn and Google+: 
    * Open the footer.hbs using `nano /var/www/html/site-name/content/themes/scrawl-master/partials/footer.hbs` and pasted the following code under div class footer-container around line 14.
    ```html linenums="1"
    <a class="social-button linkedin hidden"><i class="icon-linkedin"></i></a>
    <a class="social-button gplus hidden"><i class="icon-gplus"></i></a>
    ```
    * Then under scripts I added following code around line number 42
    ```javascript linenums="1"
    <ul>
    <li>
    case "Linkedin":
    return "https://uk.linkedin.com/in/" + username;
    </li>
    </ul>
    <ul>
    <li>
    case "Gplus":<br>
    return `[https://plus.google.com/](https://plus.google.com/)` + username;<br>
    </li>
    </ul>
    ```
    * Finally under the function revealSocialLinks around line number 69, I pasted the following code:
    ```javascript linenums="1"
    revealPlatform('Linkedin');
    revealPlatform('Gplus');
    ```
    * Finally I added the following in the header part of the code injection in front end admin panel of Ghost instance; replacing yourusername with my username for the relevant platform.
    ```javascript linenums="1"
    <script>window.__themeCfg.linkedinUsername = 'yourusername';</script>
    <script>window.__themeCfg.gplusUsername = 'yourusername';</script>
    ```


## My Learning Curve

While there were many insights and learnings, the top 5 I think on the list of learning for me while migrating from blogger to ghost are:

<ol>
<li>
<strong>Clarity on using Nginx</strong> (refer last post.) - Never before have I played around with nginx but having read so many good things about it, I was keen to try and I can say it is indeed living up to all the praise I have read. It is fast and lightweight. Will I use it for production? Ofcourse I will. Will I favour it over Apache - hmm...Maybe... Maybe not. I think I will weigh my options based on what is it I want to achieve but to know about both nginx as well as Apache Server can't hurt.
</li>
<li>
<strong>Better Idea of Networking Concepts</strong> - With Seafile and Ghost implementation in succession, I actually learnt about quite a few concepts on configuring firewall, DNS, reverse proxy, port forwarding to list a few but more importantly I read a lot about networking and this helped me understand the core concepts involved.
</li>
<li>
<strong>Deeper understanding of Web Technologies and inner workings of Ghost</strong> - While trying to modify my blog's look and feel to my liking, I had to mess around with CSS, HTML. I have used the theme <a href="https://github.com/ktweeden/scrawl"><em>scrawl</em></a> by ktweeden and modified it a bit. What attracted me most to it was the fact that it used a default colour theme similar to what I had in mind. I modified it but in doing so got a bit more understanding of how it all ties together - the default.hbs, index.hbs, post.hbs and the underlying handlebar scripts.
</li>
<li>
<strong>Markdown</strong> - I had some basic idea before I started using Ghost but if I were to use Ghost full-time, I needed to know all there is to know about markdown and while there isn't a lot - it is damn straight forward and simple - it is a very good tool indeed. I am glad I learnt it.
</li>
<li>
<strong>CSS plugins</strong> - <a href="https://prismjs.com/">Prismjs</a> comes pre-loaded with <em>scrawl</em> theme but the default skin and plugins were not enough for me so I had to replace these. Now this might be very simple for people in the know. For me, it was new and exciting and end result was so cool with numbers in code box and all that. I am obviously very happy with the end result and it did help me learn yet again how things interact within the Ghost platform.
</li>
</ol>


## The Beginning !!! 😍😃😂
