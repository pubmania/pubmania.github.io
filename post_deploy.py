# post_deploy.py
import re
import os
import yaml
import datetime
from atproto import Client, IdResolver, models
import requests

def get_yaml_frontmatter(path,access_token,at_client,image_directory,site_url):
    # Regex to match YAML front matter
    yaml_regex = re.compile(r'^(---\n.*?\n---\n)', re.DOTALL)

    # Check if the path is a directory or a file
    if os.path.isdir(path):
        # If it's a directory, process all .md files
        for filename in os.listdir(path):
            if filename.endswith('.md'):
                file_path = os.path.join(path, filename)
                process_file_yaml(file_path, yaml_regex,access_token,at_client,image_directory,site_url)
    elif os.path.isfile(path) and path.endswith('.md'):
        # If it's a single .md file, process it
        process_file_yaml(path, yaml_regex,access_token,at_client,image_directory,site_url)
    else:
        print("Provided path is neither a valid directory nor a .md file.")

def process_file_yaml(file_path, yaml_regex,access_token,at_client,image_directory,site_url):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    description_value = ""
    url = ""
    title_value = ""
    
    # Find YAML front matter
    match = yaml_regex.search(content)
    if match:
        frontmatter = match.group(1)
        # Parse the existing YAML front matter
        frontmatter_content = frontmatter.split('---')[1].strip()
        frontmatter_dict = yaml.safe_load(frontmatter_content)
        for key, value in frontmatter_dict.items():
            if key == 'date':
                created_date = value['created']
            if key == 'slug':
                slug_value = value
            if key == 'title':
                title_value = value
            if key == 'description':
                description_value = value
        
        yyyy = created_date.year
        mm = f"{created_date.month:02}"
        dd = f"{created_date.day:02}"
        
        url = f"{site_url}/{yyyy}/{mm}/{dd}/{slug_value}.html"
        image_path = f"{image_directory}/{file_path.split('/')[-1].split('.')[0]}.png"
        
        ####################################################################
        #### skip posting if created date is more than 5 days old###########
        ####################################################################
        created_date_str = f"{created_date}"
        # Convert the created_date string to a datetime object
        created_date = datetime.datetime.fromisoformat(created_date_str)
        # Get the current date
        current_date = datetime.datetime.now()
        # Calculate the difference in days
        difference = (current_date - created_date).days
        if difference <= 5:
            print(f"created_date: {created_date} and slug_value: {slug_value}")
            print(f"url: {site_url}/{yyyy}/{mm}/{dd}/{slug_value}.html")
            print(f"img_path: {image_directory}/{file_path.split('/')[-1].split('.')[0]}.png")
            #####################################################################################
            ################### skip posting if url is already posted on bluesky#################
            #####################################################################################
            
            search_params = models.app.bsky.feed.search_posts.Params(
                    q= url,
                    author=at_client.me.did,
                    limit=1,
                    sort='oldest'
                )
            
            response = at_client.app.bsky.feed.search_posts(params=search_params)
            if response.posts:
                print("BSKY POST ALREADY EXISTS, NO ACTION NEEDED")
            else:
                # Open the image file in binary mode
                with open(image_path, 'rb') as img_file:
                    # Read the content of the image file
                    img_data = img_file.read()
                
                blob_resp = requests.post(
                    "https://bsky.social/xrpc/com.atproto.repo.uploadBlob",
                    headers={
                        "Content-Type": "image/png",
                        "Authorization": "Bearer " + access_token,
                    },
                    data=img_data,
                )
                blob_resp.raise_for_status()
                card = {
                "uri": url,
                "title": title_value,
                "description": description_value,
                "thumb": blob_resp.json()["blob"]
                }
                
                embed_post = {
                "$type": "app.bsky.embed.external",
                "external": card,
                }
                
                #text = 'Check out a new post on my blog.'
                text = 'Testing automated Bsky post creation'
                post_with_link_card_from_website = at_client.send_post(text=text, embed=embed_post)
                print(post_with_link_card_from_website.uri)
    else:
        print(f"No YAML front matter found in: {file_path}")

def main():
    BLUESKY_HANDLE = os.environ.get('BSKY_HANDLE')
    BLUESKY_APP_PASSWORD = os.environ.get('BSKY_APP_PWD')
    # Make sure the environment variables are set
    if not BLUESKY_HANDLE or not BLUESKY_APP_PASSWORD:
        raise ValueError("Environment variables BLUESKY_HANDLE and BLUESKY_APP_PASSWORD must be set.")
    else:
        at_client = Client()
        at_client.login(BLUESKY_HANDLE, BLUESKY_APP_PASSWORD)
        resp = requests.post(
            "https://bsky.social/xrpc/com.atproto.server.createSession",
            json={"identifier": BLUESKY_HANDLE, "password": BLUESKY_APP_PASSWORD},
        )
        resp.raise_for_status()
        session = resp.json()
        access_token = session["accessJwt"]
        path = 'docs/posts'
        image_directory = os.path.join(os.environ['GITHUB_WORKSPACE'], 'site','assets','images','social','posts')
        site_url = os.environ['SITE_URL']
        get_yaml_frontmatter(path,access_token, at_client,image_directory,site_url)

if __name__ == "__main__":
    main()