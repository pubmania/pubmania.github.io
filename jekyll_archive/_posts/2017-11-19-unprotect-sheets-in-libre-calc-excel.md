---
title: "Unprotect Sheets in Libre Calc, Excel"
slug: "unprotect-sheets-in-libre-calc-excel"
toc: false
date: 2017-11-19T01:57:58
draft: false
description: Unprotect Sheets in Libre Calc, Excel
last_modified_at: 2018-03-29T15:37:54
classes: "wide"
---
A friend of mine today had an issue. He had created a template for some really complex calculations and to ensure he does not mess up with the forumlae by mistake he had password protected sheets and cells. He had done this back in 2012 and now he wanted change something in there but he had forgotten the password so he asked me if I can help.
Now I do not know much about how it could be done on windows or on excel but I knew a small trick on LibreOffice so I asked him to send me that excel file by email. I then took following steps:

<ol>
<li>Opened the excel file <code>Locked.xls</code> in LibreCalc.</li>
<li>Saved it as an <code>Locked.ods</code> file.</li>
<li>From file browser, right click on newly saved <code>Locked.ods</code> file -&gt; Open With -&gt; Archive Manager as shown below.<br>
<img src="../assets/images/2017/11/Menu_001.png" alt="Menu_001" loading="lazy"></li>
<li>Now open the <code>content.xml</code></li>
<li>Find <code>table:protected=&quot;true&quot;</code> and Replace All with <code>table:protected=&quot;false&quot;</code></li>
<li>Save the xml file.</li>
<li>Now open the <code>Locked.ods</code> in LibreCalc and save it as <code>Unlocked.xlsx</code></li>
</ol>

This should do the trick and unlock all password protected sheets and cells to be freely modified.
