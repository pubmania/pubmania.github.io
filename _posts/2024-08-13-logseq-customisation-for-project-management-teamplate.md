---
title: "Logseq Customisations for Project Management Template"
slug: "logseq-customisation-for-project-management-teamplate"
toc: true
date: 2024-08-13T07:15:00
draft: false
description: Notes to create a functional project logs template for Logseq graphs.
last_modified_at: 2024-08-13T08:15:00
excerpt: "Notes to create a functional project logs template for Logseq graphs."
classes: "wide"
gallery:
  - url: https://github.com/user-attachments/assets/8c9a7f4c-21a4-42a7-8951-1f4b301fa269
    image_path: https://github.com/user-attachments/assets/8c9a7f4c-21a4-42a7-8951-1f4b301fa269
    alt: "Sample Project Log"
    title: "Sample Project Log"
  - url: https://github.com/user-attachments/assets/5a295ec2-ab6c-447f-b485-d70166997eba
    image_path: https://github.com/user-attachments/assets/5a295ec2-ab6c-447f-b485-d70166997eba
    alt: "Sample Content Page"
    title: "Sample Content Page"
  - url: https://github.com/user-attachments/assets/097dab9f-33a0-4f4a-a807-15923b754e65
    image_path: https://github.com/user-attachments/assets/097dab9f-33a0-4f4a-a807-15923b754e65
    alt: "Sample Day to Day Entry"
    title: "Sample Day to Day Entry"
---

## Background

While the overall planning of project timeline gets lot of attention in the world of software, the most important aspect of project management in my experience is maintaining and tracking Issues and Actions. This in normal project management practice is carried out through the use of an `Actions Log` and an `Issues Log`. In addition any medium complexity project invariably will have internal and external dependencies / constraints, risks which I tend to track on `Constraints Log` and `Risks Log`. Finally every project has decisions that I track on a `Decisions Log`.

Additionally, any opportunities that I identify during the course of project that are not in the scope of my project I capture those too in an `Opportunities Log`

Now all these logs have fairly standard fields so I created and started using an excel template and started calling it `CARDIO Log` short for log of Constraints, Actions, Risks, Decisions, Issues, Opportunities for a given project. This has worked well for me over the past 15 years or so but there are times where in order to maintain it meant cross linking an action to an issue or a risk and so on and more often than not it would become easier to just track actions in one of the other logs and that would make it a bit chaotic.

That problem, however, is what I thought, can be resolved using Logseq especially after starting with the template by the Logseq community user Luhman and starting with his template and explanation provided [here](https://luhmann-logseq.notion.site/A-new-approach-to-project-management-in-Logseq-8b36dd5eb25d4b9e9882742b5ee4368e).

## Customisations

{% include gallery caption="Images showing Sample Data" %}

### Sample Project Log
![Screenshot_13-8-2024_15949_](https://github.com/user-attachments/assets/8c9a7f4c-21a4-42a7-8951-1f4b301fa269)

### Preparation

- First we will ensure our actions log which will be generated using the Logseq's inbuilt feature for `To Do Lists` displays fields that we want it to display.

    - Press `Ctrl+K` and search for `logseq/config.edn`
    - In the code block search for following lines:
      
    ```edn
    ;; Advanced queries `:result-transform` function.
    ;; Transform the query result before displaying it.
    :query/result-transforms
    {:sort-by-priority
     (fn [result] (sort-by (fn [h] (get h :block/priority "Z")) result))
    }
    ```

- Now replace these with following which is slightly reduced compared to the [Source](https://discuss.logseq.com/t/add-query-input-or-function-day-of-week/18361/12) as I only needed "Deadline" for my purposes and I don't use the "Scheduled" part of the Logseq task management feature:

    ```edn
    ;; Advanced queries `:result-transform` function.
    ;; Transform the query result before displaying it.
    :query/result-transforms
    {:sort-by-priority
     (fn [result] (sort-by (fn [h] (get h :block/priority "Z")) result))
     :add-task-attrs (fn [result]
       (def months {1 "January" 2 "February"  3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December"})
       (def monthName (fn [dd]
             (get months (int dd))
            ))
    	  
       ;; source: https://discuss.logseq.com/t/add-query-input-or-function-day-of-week/18361/12
       (def days {0 "Saturday" 1 "Sunday" 2 "Monday" 3 "Tuesday" 4 "Wednesday" 5 "Thursday" 6 "Friday"})
       (def weekDay (fn [date]
             (def month (quot (mod date 10000) 100))
             (def month6 (quot (- month 8) 6))
             (def year6 (+ (quot date 10000) month6))
             (def yearnum (mod year6 100))
             (def century (quot year6 100))
             (def d (mod (+ (mod date 100) (quot (* 13 (inc (- month (* month6 12)))) 5) yearnum (quot   yearnum 4) 
             (quot century 4) (* 5 century)) 7))
             (get days d)
            ))
    	  
       (def suffixes {0 "th" 1 "st" 2 "nd" 3 "rd" 4 "th" 5 "th" 6 "th" 7 "th" 8 "th" 9 "th"})
       (def positionalSuffix (fn [dd]
             (if (or (= dd "11") (= dd "12") (= dd "13"))
               (get suffixes 0)
               (get suffixes (int (subs dd (count dd) 1))) )
            ))
    	  
       (def token (fn [s] (str "⟨" s "⟩")))
       (def format
         (-> (get (js->clj (call-api "get_user_configs")) "preferredDateFormat")
            (clojure.string/replace "do" (token "1"))
            (clojure.string/replace "dd" (token "2"))
            (clojure.string/replace "d" (token "3"))
            (clojure.string/replace "EEEE" (token "4"))
            (clojure.string/replace "EEE" (token "5"))
            (clojure.string/replace "EE" (token "6"))
            (clojure.string/replace "E" (token "7"))
            (clojure.string/replace "MMMM" (token "8"))
            (clojure.string/replace "MMM" (token "9"))
            (clojure.string/replace "MM" (token "10"))
            (clojure.string/replace "M" (token "11"))
            (clojure.string/replace "yyyy" (token "12"))
            (clojure.string/replace "yy" (token "13"))
         ))
    	  
       (def parseDate (fn [date]
             (if-not date nil
               (let [
                   regex (re-pattern "(\\d{4})(\\d{2})(\\d{2})")
                   [_ yyyy mm dd] (re-matches regex (str date))
                   yy (subs yyyy 2 4)
                   d (str (int dd))
                   do (str d (positionalSuffix dd))
                   mmmm (monthName mm)
                   mmm (subs mmmm 0 3)
                   m (str (int mm))
                   eeee (weekDay date)
                   eee (subs eeee 0 3)
                   ee (subs eeee 0 2)
                   e eee
                 ]
                 (-> format
                   (clojure.string/replace (token "1") do)
                   (clojure.string/replace (token "2") dd)
                   (clojure.string/replace (token "3") d)
                   (clojure.string/replace (token "4") eeee)
                   (clojure.string/replace (token "5") eee)
                   (clojure.string/replace (token "6") ee)
                   (clojure.string/replace (token "7") e)
                   (clojure.string/replace (token "8") mmmm)
                   (clojure.string/replace (token "9") mmm)
                   (clojure.string/replace (token "10") mm)
                   (clojure.string/replace (token "11") m)
                   (clojure.string/replace (token "12") yyyy)
                   (clojure.string/replace (token "13") yy)
                 )
               )
             )
            ))
    	  
    	  
       (map (fn [x]
         (update x :block/properties (fn [u]
           (-> u
               (assoc :marker (str (get x :block/marker)) )
               (assoc :priority (str (get x :block/priority)) )
               (assoc :deadline (parseDate (get x :block/deadline)) )
               (assoc :repeated? (str (get x :block/repeated?)) )
           )
         ))
       )
       result)
     )
     }
    ```

### Plugins

- Click on `Three Dots` in top right corner of the screen and click on menu entry `Plugins` and then click on `Marketplace`
- Now install the following plugins:
    - logseq-agenda
    - logseq-automatic-linker
    - logseq-datenlp-plugin
    - logseq-diagrams-as-code
    - logseq-doc
    - logseq-emoji-picker-fork
    - logseq-emoji-shortcodes
    - logseq-luckysheet
    - logseq-markdown-table
    - logseq-paste-more
    - logseq-plugin-automatic-url-title
    - logseq-plugin-show-weekday-and-week-number
    - logseq13-full-house
    - logseq13-missing-commands

### Look and Feel
- Now, I quite like the [Mia Quattro Theme](https://playerofgames.github.io/logseq-mia-theme/) that can either be installed as a theme from marketplace or just by including the following line in `logseq/custom.css` just under the comment `/*Theme*/` right at the top of the file like so:

```css
/*Theme*/
@import url('https://playerofgames.github.io/logseq-mia-theme/mia_quattro.css');
```

- However this theme had some quirks which can be refined by adding following `css` overrides:

```css
/* Override tag and note color scheme for tags from mia_quattro theme  */
a.tag{
 font-size: 100%;
 color: var(--lx-accent-11,var(--ls-tag-text-color,hsl(var(--primary))));
}

svg.note {
   color: var(--lx-accent-11, var(--rx-yellow-08))
}

svg.tip {
   color: var(--lx-accent-11,var(--rx-blue-08))
}

/* Selection lists (search, tag complete, etc.) */

#ui__ac .chosen,
.chosen {
	--ls-primary-text-color: #ee0606;
	--ls-link-ref-text-color: #eaeaea;
	--ls-link-ref-text-hover-color: #fafafa;
	--ls-quaternary-background-color: var(--accent-dark-color);
	--ls-icon-color: var(--ls-primary-text-color);
}

#ui__ac .chosen {
	background-color: var(--accent-dark-color);
}

.menu-link.chosen  {
	color: var(--ls-primary-text-color) !important;
}

/* to make todo checkbox visible */
.form-checkbox {
	--ls-page-checkbox-border-color: var(--accent-color);

	border: 1px solid var(--ls-page-checkbox-border-color);
	border-radius: 5px;
	opacity: 1;
}
/* blockquote tweaks (reduce margin & padding and add custom colours) */

blockquote {
 padding: 8px 12px;
 border-left: 5px solid;
 border-left-color: var(--ls-page-blockquote-border-color, #7cfc00);
 margin: 0.3rem 0 !important;
}

blockquote.yellow {
 border-left-color: #ffe85580;
}

blockquote.blue {
 border-left-color: #84b5ff80;
}

blockquote.red {
 border-left-color: #ff558280;
}

.ls-block[data-refs-self^=".blue"] .blockquote{
 border-left-color: #84b5ff80;
}

/* ==mark==  tweaks */

mark {
  background: var(--ls-page-mark-bg-color);
  color: var(--ls-page-mark-color);
  padding: 1px 2px;
  margin: 0 2px;
  border-radius: 3px;
}

mark.yellow {
  background: var(--ls-page-mark-bg-color);
  color: var(--ls-page-mark-color);
}

mark.pink {
  background-color: #ff89be80;
  color: white;
}

mark.blue {
  background-color: #84b5ff80;
  color:white;
}

mark.green {
  background-color: #97ff9780;
  color: yellow;
}

mark.red {
  background-color: #ff558280;
  color: white;
}

mark.grey {
  background-color: #80808080;
  color: white;
}

mark.gray {
  background-color: #80808080;
  color: white;
}

mark.orange {
  background-color: #ffb86c80;
  color: white;
}

mark.purple {
  background-color: #c097ff80;
  color: white;
}

/* add traffic lights to prioritized tasks */

.priority[href="#/page/A" i]::before {
 content: "🔴";
 margin-right: 2px;
}

.priority[href="#/page/B" i]::before {
 content: "🟡";
 margin-right: 2px;
}

.priority[href="#/page/C" i]::before {
 content: "🟢";
 margin-right: 2px;
}

.opacity-50 {
 opacity: 1;
}
```

- As our templates later will depend on v-kanban plugin but I did not want to include the whole `css` and also wanted to modify the icons it shows with `Pros and Cons`, I include the following `css` on `logseq/custom.css`:

```css
/* -- like dislike ----------------------------------------- */

.ls-block[data-refs-self*="pros"] .block-children .bullet-container .bullet {
 display: none;
}

.ls-block[data-refs-self*="pros"] .block-children .bullet-container:after {
 content: "+";
 font-size: 20px;
 color: #1cd41c;
}

.ls-block[data-refs-self*="cons"] .block-children .bullet-container:after {
 content: "-";
 color: red;
}

a.tag[data-ref*="pros"] {
 font-size: .8rem;
 background: #014935e0;
 color: rgb(202, 247, 118);
 padding: 0 6px 3px;
 border-radius: var(--ls-border-radius-low);
 border: 1px solid rgba(137, 207, 96, 0.925);
}

a.tag[data-ref*="cons"] {
 font-size: 13px;
 background: #4b033bda;
 color: rgb(255, 116, 128);
 padding: 0 6px 3px;
 border-radius: var(--ls-border-radius-low);
 border: 1px solid rgba(182, 13, 41, 0.925);
}

a.tag[data-ref*="pros"]:hover {
 filter: contrast(2) brightness(10);
}

a.tag[data-ref*="pros"]:before {
 content: "✅ ";
 font-size: 13px
}

a.tag[data-ref*="cons"]:before {
 content: "❌ ";
 font-size: 13px
}


a.tag[data-ref*="red"]:before {
 content: "🔴";
 margin-right: 2px;
}

a.tag[data-ref*="amber"]:before {
 content: "🟠";
 margin-right: 2px;
}

a.tag[data-ref*="green"]:before {
 content: "🟢";
 margin-right: 2px;
}

a.tag[data-ref*="on-hold"]:before {
 content: "🟣";
 margin-right: 2px;
}

a.tag[data-ref*="yellow"]:before {
 content: "🟡";
 margin-right: 2px;
}

a.tag[data-ref*="closed"]:before {
 content: "🔵";
 margin-right: 2px;
}

a.tag[data-ref*="no-go"]:before {
 content: "🚫";
 margin-right: 2px;
}

a.tag[data-ref*="merged"]:before {
 content: "⚪";
 margin-right: 2px;
}

/* -------------------------------- like dislike end  ------ */

/*===========================================================*/
/* css columns view / kanban  v20220510--------------------- */
/* use: inline tag #kanban, #kanban-small or #kanban-wXXX    */
/* try:  #kanban-w200,#kanban-w300, #kanban-w400             */

div[data-refs-self*="kanban"]>.block-children-container.flex {
    width: 100%;
}

div[data-refs-self*="kanban"]>.block-children-container.flex>.block-children.w-full {
    display: inline-flex;
    position: relative;
    overflow-x: auto !important;
    overflow-y: hidden;
    margin: 0 10px;
}
	  
div[data-refs-self*="kanban"]>.block-children-container.flex>.block-children.w-full>div.ls-block {
    display: inline-block;
    padding: 0;
    width: inherit;
    min-width: 200px;
    margin-right: 10px;
}
	  
/* wide */

div[data-refs-self*="kanban-small"]>.block-children-container.flex>.block-children,
div[data-refs-self*="kanban-wide"]>.block-children-container.flex>.block-children {
   min-width: 90vw;
   left: 50%;
   transform: translate(-50%);
   background-color: var(--ls-primary-background-color);
   overflow-x: scroll !important;
   overflow-y: hidden;
   margin: 10px 30px;
}

div[data-refs-self*="kanban-wide"]>.block-children-container.flex>.block-children>div.ls-block {
   display: inline-block;
   min-width: 350px;
   padding: 8px 0px !important;
   font-size: 0.85rem;
   margin: 5px 0px;
   background-color: var(--ls-secondary-background-color);
   box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
   border-radius: var(--ls-border-radius-medium);
}


/* #kanbansmall : smaller font with hover zoom */

div[data-refs-self*="kanban-small"]>.block-children-container.flex>.block-children>div.ls-block {
   display: inline-block;
   min-width: 350px;
}

div[data-refs-self*="kanban-small"]>.block-children-container.flex>.block-children .block-content {
   font-size: 10px;
   font-weight: 300;
}

div[data-refs-self*="kanban-small"]>.block-children-container.flex>.block-children .block-content:hover {
   font-size: 14px !important;
   min-width: 100px;
}


/* #kanban-w[100-300] : force width of the columns */

div[data-refs-self*="kanban-w100"]>.block-children-container.flex>.block-children.w-full>div.ls-block {
   min-width: 100px;
}

div[data-refs-self*="kanban-w150"]>.block-children-container.flex>.block-children.w-full>div.ls-block {
   min-width: 150px;
}

div[data-refs-self*="kanban-w200"]>.block-children-container.flex>.block-children.w-full>div.ls-block {
   min-width: 200px;
}
div[data-refs-self*="kanban-w300"]>.block-children-container.flex>.block-children.w-full>div.ls-block {
   min-width: 300px;
}
div[data-refs-self*="kanban-w400"]>.block-children-container.flex>.block-children.w-full>div.ls-block {
   min-width: 400px;
}
div[data-refs-self*="kanban-fit"]>.block-children-container.flex>.block-children.w-full>div.ls-block {
   min-width: 400px;
       width: max-content; 
}

/* remove left border for kanbanized */
[data-refs-self*="kanban"] .block-children-left-border {
   opacity: 0;
}

/* fix modal list not appearing*/
.block-children {
   overflow: visible !important;
} 

.ls-block[data-refs-self*="kanban"] .absolute-modal,
.ls-block[data-refs-self*="kanban"] #ui__ac {
   min-height: 80px;
}
           
/*--------------------------------------------- kanban end-- */

/*------------------expreimetal for better table view START-------------------*/
.table-wrapper {
    width: 100% !important;
    max-width: 100% !important;
}

table td {
    min-width:100px;
    word-wrap:break-word;
}


table th {
    word-break: keep-all;
}
/*------------------expreimetal for better table view END-------------------*/
```

- In order to invoke some of the above tweaks, we will also create keyboard shortcuts and shortcodes to have a simpler way to change colour of the blockquote side border and highlights. So open `logseq/config.edn` and do the following:
    - Search for:
    ```edn
    ;; Macros replace texts and will make you more productive.
    ;; Example usage:
    ;; Change the :macros value below to:
    ;; {"poem" "Rose is $1, violet's $2. Life's ordered: Org assists you."}
    ;; input "{{poem red,blue}}"
    ;; becomes
    ;; Rose is red, violet's blue. Life's ordered: Org assists you.
    :macros {}
    ```
    - and replace above with:
    ```edn
    ;; Macros replace texts and will make you more productive.
    ;; Example usage:
    ;; Change the :macros value below to:
    ;; {"poem" "Rose is $1, violet's $2. Life's ordered: Org assists you."}
    ;; input "{{poem red,blue}}"
    ;; becomes
    ;; Rose is red, violet's blue. Life's ordered: Org assists you.
    :macros {
     ">" "<blockquote class='$1'>$2</blockquote>" ;;usage {{> orange,Text to be presented in the blockquote}}
     "==" "<mark class='$1'>$2</mark>" ;;usage {{== red,Text to be highlighted without linebreak}}
     }
    ```
    - search for:
    ```edn
    ;; Add custom commands to the command palette
    ;; Example usage:
    ;; :commands
    ;; [
    ;;  ["js" "Javascript"]
    ;;  ["md" "Markdown"]
    ;;  ]
    :commands []
    ```
    - and replace above with:
    
    {: .notice--info}
    If you will copy and paste the code below please make sure that you remove the `white space and forward slashes (\)` between the curly two consecutive brackets so it looks like this: {% raw %} ["bookmark                                        [.b]" [[:editor/input "{{ renderer :template, Bookmark}}" ]]],{% end raw %}
  

    ```
    ;; Add custom commands to the command palette
    ;; To quickly call these commands, just type / (backslash) followed by characters in square bracket
    :commands [
                ["bookmark                                        [.b]" [[:editor/input "\{\{ renderer :template, Bookmark\}\}" ]]],
                ["date_today                                      [dt]" [[:editor/input "\{\{ renderer :template, Date Today\}\}" ]]],
                ["issue_table                                     [.it]" [[:editor/input "\{\{ renderer :template, Issue_table\}\}" ]]],
                ["issue                                           [.is]" [[:editor/input "\{\{ renderer :template, Issue\}\}" ]]],
                ["circle                                          [.c]" [[:editor/input "\{\{ renderer :template-view, circle-template, :color orange\}\}" ]]],               
                ["Blue Highlighter                                [=b]" [[:editor/input "<mark class='blue'></mark>" {:backward-pos 7}]]],
                ["Green Highlighter                               [=g]" [[:editor/input "<mark class='green'></mark>" {:backward-pos 7}]]],
                ["Gray Highlighter                                [=gra]" [[:edior/input "<mark class='gray'></mark>" {:backward-pos 7}]]],
                ["Grey Highlighter                                [=gre]" [[:editor/input "<mark class='grey'></mark>" {:backward-pos 7}]]],
                ["Orange Highlighter                              [=o]" [[:editor/input "<mark class='orange'></mark>" {:backward-pos 7}]]],
                ["Pink Highlighter                                [=p]" [[:editor/input "<mark class='pink'></mark>" {:backward-pos 7}]]],
                ["Red Highlighter                                 [=r]" [[:editor/input "<mark class='red'></mark>" {:backward-pos 7}]]],
                ["Yellow Highlighter                              [=y]" [[:editor/input "<mark class='yellow'></mark>" {:backward-pos 7}]]],
                ["Purple Highlighter                              [=pu]" [[:editor/input "<mark class='purple'></mark>" {:backward-pos 7}]]],
                ["Red Blockquote                                  [>r]" [[:editor/input "<blockquote class='red'></blockquote>" {:backward-pos 13}]]],
                ["Yellow Blockquote                               [>y]" [[:editor/input "<blockquote class='yellow'></blockquote>" {:backward-pos 13}]]],
                ["Blue Blockquote                                 [>b]" [[:editor/input "<blockquote class='blue'></blockquote>" {:backward-pos 13}]]],     
              ]
    ```
    
    {: .notice--warning}
    > Now, some of the short-codes above such as `/.is, /.it, /dt and /.c` will not work just yet because we have not created their associated template. We will get to that in next section.

### Create Templates

- Create a new page named `templates`.
- Press `Ctrl+K` and search for `templates` and open the page.
- Once on the page, click on `Three dots` in top right corner of the screen and from the drop down menu select `Open in default app`
- Here paste the following then save and close the default app:

```
		title:: templates
		visibility:: false
		icon:: 🧾
		
		- # Circle
		  id:: 66b0d360-cde5-4e95-87b3-4e97a1e23bb5
		  template:: circle-template
		  template-including-parent:: false
		  arg-color:: red
			- <span class='circle' style='background: ``c.args.color``; display: inline-block; width: 15px; height: 15px; border-radius: 50%; vertical-align: middle;'></span>
		- # People Page
		  template:: people page
		  template-including-parent:: false
			- tags:: people
			  icon:: 👨‍💼
			- ## Tasks
				- query-table:: true
				     query-properties:: [:priority :deadline :block]
				  #+BEGIN_QUERY
				  {:title [:h3 "Owned"]
				  :query [:find (pull ?b [*])
				       :in $ ?tag
				       :where
				       [?b :block/marker ?marker]
				       [(contains? #{"TODO" "DOING" "NOW" "LATER" "WAITING"} ?marker)]
				       (page-ref ?b ?tag)
				       [?ref :block/name "project"]
				       (not [?b :block/refs ?ref])]
				  :inputs [:query-page]
				  :result-transform :add-task-attrs
				  :breadcrumb-show? true
				  :group-by-page? false
				  :collapsed? false
				  }
				  #+END_QUERY
				- query-table:: true
				  collapsed:: true
				     query-properties:: [:marker :deadline :block]
				  #+BEGIN_QUERY
				  {:title [:h3 "Closed or Cancelled"]
				  :query [:find (pull ?b [*])
				       :in $ ?tag
				       :where
				       [?b :block/marker ?marker]
				       [(contains? #{"DONE" "CANCELLED" "CANCELED" } ?marker)]
				       (page-ref ?b ?tag)
				       [?ref :block/name "project"]
				       (not [?b :block/refs ?ref])]
				  :inputs [:query-page]
				  :result-transform :add-task-attrs
				  :breadcrumb-show? true
				  :group-by-page? false
				  :collapsed? true
				  }
				  #+END_QUERY
		-
		- # Issue Table
		  template:: Issue_table
		  template-including-parent:: false
			- #.tabular
				- ## 01 ``{|}``Issue Title``{|}``
				  
				  owner::
				  status:: #Red 
				  #Issues #.v-kanban
					- ### **Issue Description**
						-
					- ### **Updates**
						- ``[today]`` :
				- ## 02 Issue Title
				  owner::
				  status:: #Amber
				  #Issues #.v-kanban
					- ### **Issue Description**
						-
					- ### **Updates**
						- ``[today]`` :
				- ## 03 Issue Title
				  owner:: 
				  status:: #Yellow
				  #Issues #.v-kanban
					- ### **Issue Description**
						-
					- ### **Updates**
						- ``[today]`` :
				- ## 04 Issue Title
				  owner:: 
				  status:: #Green
				  #Issues #.v-kanban
					- ### **Issue Description**
						-
					- ### **Updates**
						- [[Monday, 2024/08/12]] :
				- ## 05 Issue Title
				  owner:: 
				  status:: #on-hold 
				  #Issues #.v-kanban
					- ### **Issue Description**
						-
					- ### **Updates**
						- [[Monday, 2024/08/12]] :
				- ## 06 Issue Title
				  owner:: 
				  status:: #no-go
				  #Issues #.v-kanban
					- ### **Issue Description**
						-
					- ### **Updates**
						- [[Monday, 2024/08/12]] :
				- ## 07 Issue Title
				  owner:: 
				  status:: #closed
				  #Issues #.v-kanban
					- ### **Issue Description**
						-
					- ### **Updates**
						- [[Monday, 2024/08/12]] :
		- # Issue
		  template:: Issue
		  template-including-parent:: false
			- ## ``{|}``01 Issue Title``{|}``
			  
			  owner::
			  status:: #Red
			  #Issues #.v-kanban
				- ### **Issue Description**
					-
				- ### **Updates**
					- ``[today]`` :
		- # Date Today
		  template:: Date Today
		  template-including-parent:: false
			- **``today``** ``{|}``
		- # [[Bookmarks]]
		  template:: Bookmark
		  template-including-parent:: false
			- url:: ``{|}``
			  
			  topic::
		- # [[Project page]]
		  template:: project page
		  template-including-parent:: false
			- tags:: project page
			  icon:: 📂
			- ## Project Meta
			  collapsed:: true
				- DOING [#B] #project <% current page %>
			- ## Actions Log
				- query-properties:: [:deadline :priority :block]
				  #+BEGIN_QUERY
				  {:title [:h4 "On ToDo List"]
				  :query [:find (pull ?b [*])
				       :in $ ?tag
				       :where
				       [?b :block/marker ?marker]
				       [(contains? #{"TODO"} ?marker)]
				       (page-ref ?b ?tag)
				       [?ref :block/name "project"]
				       (not [?b :block/refs ?ref])]
				  :inputs [:query-page]
				  :result-transform :add-task-attrs
				  :breadcrumb-show? true
				  }
				  #+END_QUERY
				- query-table:: false
				  query-properties:: [:page :block]
				  #+BEGIN_QUERY
				  {:title [:h4 "Ongoing Tasks"]
				  :query [:find (pull ?b [*])
				       :in $ ?tag
				       :where
				       [?b :block/marker ?marker]
				       [(contains? #{"DOING" "NOW" "LATER" "WAITING"} ?marker)]
				       (page-ref ?b ?tag)
				       [?ref :block/name "project"]
				       (not [?b :block/refs ?ref])]
				  :inputs [:query-page]
				  :result-transform :add-task-attrs
				  :breadcrumb-show? true
				  :group-by-page? false
				  :collapsed? false
				  }
				  #+END_QUERY
				- query-properties:: [:deadline :priority :block]
				  collapsed:: true
				  #+BEGIN_QUERY
				  {:title [:h4 "Completed Tasks"]
				  :query [:find (pull ?b [*])
				       :in $ ?tag
				       :where
				       [?b :block/marker ?marker]
				       [(contains? #{"DONE"} ?marker)]
				       (page-ref ?b ?tag)
				       [?ref :block/name "project"]
				       (not [?b :block/refs ?ref])]
				  :inputs [:query-page]
				  :result-transform :add-task-attrs
				  :breadcrumb-show? true
				  :table-view? false
				  :collapsed? true
				  }
				  #+END_QUERY
			- ## Issues Log
				- query-sort-by:: status
				     query-table:: true
				     query-sort-desc:: true
				     query-properties:: [:block :owner :status]
				  #+BEGIN_QUERY
				  {:title [:h4 "Open Issues"]
				  :query [:find (pull ?b [*])
				       :in $ ?query-page
				       :where
				       [?p :block/name ?query-page]
				  	 [?tag2 :block/name "issues"]
				  	 [?b :block/refs ?tag2]
				  	 [?tag1 :block/name "closed"]
				  	 (not [?b :block/refs ?tag1])
				       [?b :block/refs ?p]
				       [?ref :block/name "project"]
				       (not [?b :block/refs ?ref])         
				       ]
				  :inputs [:query-page]
				  :breadcrumb-show? false
				  :table-view? true
				  :group-by-page? false
				  :collapsed? false
				  }
				  #+END_QUERY
				- query-properties:: [:block :owner :status]
				  collapsed:: true
				  #+BEGIN_QUERY
				  {:title [:h4 "Closed Issues"]
				  :query [:find (pull ?b [*])
				       :in $ ?query-page
				       :where
				       [?p :block/name ?query-page]
				  	 [?tag2 :block/name "issues"]
				  	 [?b :block/refs ?tag2]
				  	 [?tag1 :block/name "closed"]
				  	 [?b :block/refs ?tag1]
				       [?b :block/refs ?p]
				       [?ref :block/name "project"]
				       (not [?b :block/refs ?ref])         
				       ]
				  :inputs [:query-page]
				  :breadcrumb-show? false
				  :table-view? true
				  :group-by-page? false
				  :collapsed? true
				  }
				  #+END_QUERY
			- #+BEGIN_QUERY
			  {:title [:h2 "Project Notes"]
			  :query [:find (pull ?b [*])
			       :in $ ?query-page
			       :where
			       [?p :block/name ?query-page]
			       [?b :block/refs ?p]
			  	 [?tag2 :block/name "issues"]
			  	 (not [?b :block/refs ?tag2])
			       [?ref :block/name "project"]
			       (not [?b :block/refs ?ref])        
			       (not [?b :block/marker _])
			       ]
			  :inputs [:query-page]
			  :result-transform (fn [result]
			                   (sort-by (fn [b]
			                              (get b :block/created-at "A")) result))
			  :breadcrumb-show? false
			  :group-by-page? true
			  :collapsed? false
			  }
			  #+END_QUERY
		-
```

### Contents page

- Press `Ctrl+K` and search for `contents` and open the page.
- Once on the page, click on `Three dots` in top right corner of the screen and from the drop down menu select `Open in default app`
- Here paste the following then save and close the default app:

```markdown
  - query-properties:: [:icon :page :updated-at]
  #+BEGIN_QUERY
  {:title [:h1 "⏳ Ongoing Projects"]
    :query [:find (pull ?page [*])
        :where
          [?block :block/page ?page]
          [?page :block/name ?pagename]
          [?block :block/marker ?marker]
          [(contains? #{"DOING"} ?marker)]
          (page-ref ?block "project")
          (not [?page :block/name "templates"])
      ]
      :breadcrumb-show? false
      :collapsed? false}
  #+END_QUERY
  
  - query-properties:: [:icon :page :updated-at]
    #+BEGIN_QUERY
    {
    :title [:h1 "👨‍💼People"]
    ;; ---- Get every block into variable ?block
    :query [:find (pull ?block [*])
        ;; ---- filter command
        :where
        ;; ---- get page name (lowercase) from the special page block into variable ?pagename
        [?block :block/name ?pagename]
        ;; ---- Select if block is a special page block and has a single property (arg1) with value arg2
        (page-property ?block :tags "people")
    ]
    }
#+END_QUERY
```

### Sample Content Page
![screenshot_20240813-152544](https://github.com/user-attachments/assets/5a295ec2-ab6c-447f-b485-d70166997eba)

## Usage

### Sample Day to Day Capture
![Screenshot_13-8-2024_151147_](https://github.com/user-attachments/assets/097dab9f-33a0-4f4a-a807-15923b754e65)

### Create Project
- To create a CARDIO Log for a project, first create a new page and give it name of the Project.
- Next, open the newly created `project page`.
- Once opened, press `Ctrl+t` and select `project page` template and press `enter`.
- This will create all relevant sections for the Project.

### Create User Page
- Create a new page with the user / resource name.
- Open the newly created page.
- Once opened, press `Ctrl+t` and select `people page` template and press enter.
- This will create all relevant sections to track actions for this resource.

### Create New Issues
- Now for everyday usage, each time there is a new issue or a number of issues they can simply be recorded by typing `/.is` for single issue and `/.it` for a table of issues.
- Once the issue or issues table is created, all usual fields can be filled but most importantly the issue title must include hashtag for the project that the issue belongs to.
	- So an issue for project called `North Star` must have `#[[North Star]]` in the title.
	- As an example say the issue is to do with `lack of resources` then the title should be `#[[North Star]]: Lack of Resources`
	- The issue `status` or any topic to be highlighted with RAG status can be tagged with following tags:

        |Tag| Circle Appended|
        |---|---|
        |#red|🔴|
        |#amber|🟠|
        |#green|🟢|
        |#on-hold|🟣|
        |#yellow|🟡|
        |#Closed|🔵|
        |#no-go|🚫|

- Circles with additional colours can be created using the template. To do so, press `/.c` and press `enter`. This should then put following text on the editor: `{% raw %} {{renderer :template-view, circle-template, :color orange}} {% endraw %}`

- Now just replace `orange` in above with the colour desired.

### Maintain Issues Log
- Reviewing the logs is as simple as opening the [[Contents]] page, clicking the project name and scrolling down to the `Issues Log` section.
- Now if there are actions identified during the review of an issue, they can be simply added in the `updates` section under the date of review `which can be quickly added by pressing Ctrl+_+Shift+D` and then noting down the action as a sub bullet `TODO [#A] Do Something /deadline`
- I usually log decisions against a logged issue or if they resulted from a general discussion, just as `#<projectname> #decision`.

### Day to day notes
- All the project relevant notes will be automatically collected on the project's page so long as they have been tagged with the project name so for the day to day notes all that is required is add entires in the `Journal`.

#### Blockquotes
- As we added css for different coloured borders of blockquotes and also created shortcode and keyboard shortcut we can do this in multiple ways:
    - Type `/>b`and press enter. This will place `<blockquote class='blue'></blockquote>` and the quote can be written between the tags.
    - Type the following, replacing yellow with one of the predefined colours: yellow, pink, blue, green, red, grey, gray, orange or purple.
      {% raw %}
      {{> yellow,Some yellow quote}}
      {% endraw %}

#### Coloured Highlight
- Type `/=y`, select `Yellow Highlighter` from pop-up menu and press enter. This will place `<mark class='yellow'></mark>` and text to be highlighted can be written between the tags. It will be presented as <mark>Yellow Highlight</mark>
- Type the following and it will be presented as <span style="background-color: pink">This text is highlighted.</span>

  {% raw %}
  {{== pink,pink highlight}}
  {% endraw %}
  
