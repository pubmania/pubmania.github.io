---
title: "Git Jargon"
slug: "git-jargon"
toc: true
date: 2023-02-28T17:50:00
draft: false
description: Recap on Git basics and explanation of some git jargon
last_modified_at: 2023-02-28T17:50:00
excerpt: "Familiarisation with some Git jargon"
classes: "wide"
---

# Git Jargon

Before we delve into the topic of how collaboration happens using git, lets get some terminology out of the way. 

* `repo`: When talking to techy chaps, one will encounter the word `repo` very often. However, `repo` is just a shortform for the complete word `repository`.

* `repository`: Now `repository` in git speak is basically specific to a project and is nothing but a fancy alias for the **working directory** where all the digital assets being tracked for the project are placed.

* `root`: The term `root` when used with reference to a folder, directory, repo or repository is basically the directory in which all the digital assets of your project are stored. This directory may or may not contain other sub directories.

* `remote`: `remote` is a way to refer to server. So if a techy were to say "I have updated File X on remote" - it will basically translate in plain English to something like this - "I updated the File X on my laptop and have then also taken required actions to get those updates reflected on the copy saved on the server."

* `push`: This refers to sending updates carried out (commited) on a local machine to the server (remote). Fairly frequently one may come across statements when checking for status updates on the lines of "I have pushed my changes to remote" which in normal English means "I made required changes on my local machine, committed them and then sent (pushed) them to the server (remote)"

* `pull`: This refers to getting updates from the server (remote) on to the local machine. This is an activity typically carried out before one is planning to make any changes or updates to last known version. So if say a task is assigned to an individual for updating file , a reply can be "Alright, I will pull the latest from remote and make changes and will let you know once I have pushed my changes back." which will translate to "Alright, I will get the latest copy from server, make the changes you have asked for and then commit those changes and send it back as updated version on the server"

* `main`: This refers to the final / published version of project's repository.

* `branch`: This term is more of a concept really. You see `branch` is a mechanism to carry out changes without impacting the main version and therefore a `branch` is basically just a new or separate version of the main repository where one can make changes to their heart's content without worrying about messing up with the last known final version.

* `merge`: Once the experimental changes in a `branch` are completed and proven not be breaking any other digital assets, it is desirable indeed to get these changes reflected on the main version and this action of bringing digital assets in `main` to reflect same changes as that on the `branch` is called `merge`.

* `modified`: In git speak, any changes (updates, additions, deletions) to a digital asset (including deletion of entire digital asset) then that digital asset will be identified as `modified`

* 'staged`: The `modified` digital assets are not automatically assumed to contribute a version change and that is only done when those changes are added explicity by issuing the command `git add <filenaem / foldername` and at this point the changes are said to be staged.


# Recap

With this in mind, the flow of GIT can now be explained as below:

1. To work with Git, you first initialise it on a directory which will make it a `Repository`
2. Once initialised, Git creates a hidden firectory called `.git` which is used to keep track of changes in the initialised directory.
3. At this point, we need to make Git aware of the files in this repository which we want Git to track and in doing so we `stage` those digital assets.
4. From this point on, any changes made to digital assets in project folder can be tracked.
5. If a digital asset which is being tracked is changed, it gets the status of `modified`.
6. Any digital asset with status must be `staged` before it can be passed on for version control.
7. Once `staged` files must be `committed` so that the changes can be treated as the latest version snapshot.
8. As each commit is tracked by Git, it is possible to revert to a previous version by first identifying the commit id one wants to revert to using `git log` and then providing that commit id through `git revert <commit_id>`