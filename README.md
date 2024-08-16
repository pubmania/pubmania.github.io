# Getting it ready
Following the guidance on https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/

For including code block with line numbers use as shown below:

```
{% highlight clj linenos %}
;; Advanced queries `:result-transform` function.
;; Transform the query result before displaying it.
:query/result-transforms
{:sort-by-priority
  (fn [result] (sort-by (fn [h] (get h :block/priority "Z")) result))
}
{% endhighlight %}
```
For admonitions:

```
{: .notice}
Type the notice statement here...

{: .notice--info}
This will create information notice
```

`--info` can be replaced with `--warning`, `--danger`, `--success` etc.


