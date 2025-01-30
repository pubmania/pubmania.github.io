import re

def custom_formatter(source):

    string = f"""
<div class = "parent" markdown>
<div class = "poem" markdown>
{source}
</div>
</div>
"""
    return string

def fn_extract_poem_blocks(content):
    # Regular expression to find all occurrences of text between "```poem" and "```"
    pattern = r'```poem(.*?)```'
    
    # Use re.DOTALL to make '.' match newlines as well
    matches = re.findall(pattern, content, re.DOTALL)
    
    # Strip whitespace from each match and return the list
    return [match for match in matches]

def on_page_markdown(markdown, page, **kwargs):
    poem_content = fn_extract_poem_blocks(markdown)
    if poem_content:
        for content in poem_content:
            rendered_html = custom_formatter(content)
            markdown = markdown.replace(f"```poem{content}```", rendered_html)
    return markdown