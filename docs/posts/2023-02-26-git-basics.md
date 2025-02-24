---
title: "Git Basics"
slug: "git-basics"
authors: [ankit]
date: 
    created: 2023-02-26 17:50:00
    updated: 2023-02-26 17:50:00
draft: false
description: Basic overview of what GIT is and how to use it
comments: false
bsky: true
bluesky_url: https://bsky.app/profile/ankitmittal.bsky.social/post/3lcse7yabrd2x
categories:
  - Software
  - Development
  - Git
---

## Basics of Git 

Recently, I was asked to help people understand what is this whole business with GIT and I ran a few sessions on the topic specifically keeping in mind that my audience consisted of tech enthusiasts with minimal tech background. The content below is how I explained and as it went down well, I figured it may be helpful to someone else too; hence this post. :smile:

<!-- more -->

### Version Control System

To understand the tool git lets first start by understanding what problem does it actually solve. At the most basic level git is a version control system. What this means is that it allows automated control of maintaining different versions of a digital asset such as a text file, CV, or indeed code files for a software. Now for simpler things like CV or text file one may not need something as sophisticated and complex as git but when it comes to maintaining assets for a software it is indeed a very useful tool.

To understand how significant this is, lets put it in perspective of a typical business operations scenario completely unrelated to software development:

* Say there was an RFP response on which multiple people from Sales, Marketing, Pursuit and Technical team were helping prepare a response.
* Each team will complete one section of the response document relevant to their area.
* This will then all need to be integrated into the final response and reviewed by the Sales Lead.
* Any changes that Sales Lead identifies will need further changes which will then again need to be amended on the document.

Even with change tracking enabled in MS Word, we all know how painful this entire exercise is. So much so that at times we try doing it together so all changes can be done once or we opt for the approach of making changes sequentially where one section is completed by one team before another can be started by another team. This when we have one document!!! 

Now imagine if we had 1000s of such documents - that is a real scenario for software developers as each software has multiple files that may need input from multiple people. So having an automated version control helps save time because it, at the most basic level, saves time on integrating changes carried out by different people or teams that were carried out in parallel.

Now when it comes to version control there are two main ways in which it can be achieved:

* **Centralised Version Control System**: In our RFP example, the approach where everyone gathers together to carry out change on the main version will be a good simulation of centralised version control. What this means is that the changes to digital asset are done at one central location which is tightly controlled. This might as well be right approach for a smaller undertaking such as our RFP example but when it comes to software development it is not considered to be the best.

* **Distributed Version Control System**: This is loosely what would have been the approach in our RFP example if people were to carry out changes on their copy of document which will then be merged by Sales Lead to prepare the final response. Basically a distributed version control system works on the principle that each contributor to the change of digital asset will make change on their local copy and then submit the change for version maintenance to the version controller. Git as a system shines in this approach of distributed version control.

### Working Directory

Directory is technically correct name for what are called folders in Windows Operating System and **Working Directory** is the directory in which the user is currently working. For example, let's say I create a folder called "Project_1" in windows on path "C:/Documents" and save a python script in that folder, then the working directory will be "Project_1" and working directory path will be "C:/Documents/Project_1".

In order to version control this file, one can use git but this will include understanding the steps of how to go about it as explained in following sections.

### Initiatlise

Now when let's say the script file script.py is created by developer. It is not being tracked by git at this time. Now if we want it tracked by git, we need to first initiate git on the working directory. This is done using the command: `git init` but before typing this on command line, one needs to first get into the working directory on command line or terminal.

In our example this will be done like so:

```bash
cd C:/Documents/Project_1
git init
```

This will create a `.git` directory (folder) inside the working directory.

This is equivalent of git software saying it is now ready to start tracking but it will still need to know what exactly we want it to track. This is what `git add` does. 

### Add

To tell git what we want it to track, we have to use the command `git add <filenames / foldernames>`. However, if there are 100 script files in directory it will be very cumbersome to type every single filename and as a shortcut one can use dot notation for current working directory which is dot(.) and the command can be issued as:

```bash
## To add all content of the working directory
git add .

## To add specific file say script.py
git add script.py
```

This tells git that we want all files and directories (folders) in the current working directory to be tracked.

At this point, git is basically aware that it has to monitor changes on these files but it will not assume that every change we have made needs to be applied to maintained version so when we have added these files, we have basically also just said prepare these files for finalising their version - In other words we have asked git to **stage**. 

In order to finalise the versioning, we have to now tell this specifically to git which is done using `commit`. This will also be reflected in the tracking status which can be checked using `status`

### Status

One can check current tracking status of various files and directories on the git initialised working directory by using the command:

```bash
git status
```

### Commit

So we have got git to stage the files and now we want it to label the latest changes as a new version and this is achieved using the command:

```bash
git commit -m <Comment for the commit>
```
This command ensures that git now makes the latest changes baseline and still keep record of previous changes. This is especially useful if in case we want to revert to a previous version for some reason - say we found that in latest version there were quite a few mistakes which will need to be rewworked and until then previous version is what we want to keep as baseline for anyone who wants to refer and make changes to. This reverting can be achieved using `revert`

### Revert

Now reverting to a previous version requires that we know the commit id that git applied to previous commits and then identify the exact commit id to which we want git to revert to. This can be achieved by checking git logs, so the sequence to git revert will be like so:

```bash
## Find the commit id to revert to
git log

## Copy the commit id of the version to revert to and issue following command
git revert <commit id to revert to>
```

Now at this point, all changes are being tracked on the local machine of the user, so how can this help with collboration. This is achieved by synchronising the latest version on local machine to a central server. This could be a server hosted by an organisation or it can be something public like Github, Gitlab and such. As GitHub is most frequently used in enterprise environment, lets see how that works.

Github basically is a web based utility which acts as a remote location where we can push our finalised version to be saved in what is called a **github repository** for other collborators to then download (clone) as their local copy and work on. Once each poarty has made changes, the can each push their changes to the github with help of git and the version control will be applied automagically or in some instance with minimal manual intervention from the maintaining or one pushing the changes.

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml
!define DEVICONS https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/devicons
!define FONTAWESOME https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/master/font-awesome-5
!include FONTAWESOME/users.puml
!include FONTAWESOME/server.puml
!include DEVICONS/git.puml
!include FONTAWESOME/laptop_code.puml
!include FONTAWESOME/folder.puml
!include FONTAWESOME/file_alt.puml
!include DEVICONS/git_commit.puml
!include DEVICONS/github.puml
!include DEVICONS/git_branch.puml
''https://github.com/tupadr3/plantuml-icon-font-sprites/blob/master/font-awesome-5/index.md
HIDE_STEREOTYPE()

AddElementTag(wip, $bgColor=red)

Person(dev,"User")
System(laptop,"Local Device",$sprite="laptop_code")
System(git,"Git on local device",$sprite="git")
System(github,"GitHub (Remote)",$sprite="github")
Rel_R(dev,laptop,"Make changes")
Rel_R(laptop,git,"Tracked by Git")
Rel_R(git,github,"Push commits")

System_Boundary(OnDevice, "On Device"){
    Component(folder, "Working Directory",$sprite="folder"){
        System(file, "Working File",$sprite="file_alt")
        Component(git_tracker, "GIT Tracker",$sprite="git"){
            System(a_file, "Add File",$sprite="file_alt", $tags = "wip")
            System(c_file, "Commit File",$sprite="git_commit", $tags = "wip")
            Rel_D(a_file,c_file,"git commit -m <message>")
        }
        Rel_R(file,a_file,"git add ./<file>")
    }
}

System_Boundary(Remote_Repository, "Github"){
    System(repo, "main repo",$sprite="git_branch")
}
Rel_R(c_file,repo,"git push origin main")
Lay_D(git, repo)
Lay_R(a_file,c_file)
Lay_D(laptop,file)
Lay_D(git,a_file)
Lay_D(laptop,folder)

@enduml
```

There is lots going on in this last bit so lets break it down to digestable chunks of information in next session.