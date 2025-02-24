# post_deploy.py
import os
import re
import yaml
import datetime
import requests
import frontmatter  # pip install python-frontmatter
from git import Repo
from atproto import Client, models

def is_last_commit_by_script(repo):
    """Check if last commit was made by this script"""
    last_commit = repo.head.commit
    return "Add Bluesky URL for" in last_commit.message

def get_yaml_frontmatter(path, access_token, at_client, image_directory, site_url, repo):
    """Process all Markdown files in the given path."""
    yaml_regex = re.compile(r'^(---\n.*?\n---\n)', re.DOTALL)
    modified_files = []

    if os.path.isdir(path):
        for filename in os.listdir(path):
            if filename.endswith('.md'):
                file_path = os.path.join(path, filename)
                if process_file_yaml(file_path, yaml_regex, access_token, at_client, image_directory, site_url, modified_files):
                    modified_files.append(file_path)
    elif os.path.isfile(path) and path.endswith('.md'):
        if process_file_yaml(path, yaml_regex, access_token, at_client, image_directory, site_url, modified_files):
            modified_files.append(path)
    else:
        print("Provided path is neither a valid directory nor a .md file.")

    # Commit all changes at once if any files were modified
    if modified_files:
        repo.index.add(modified_files)
        repo.index.commit("Update Bluesky URLs in frontmatter")
        origin = repo.remote(name="origin")
        origin.push()
        print(f"Committed updates for {len(modified_files)} posts")

def process_file_yaml(file_path, yaml_regex, access_token, at_client, image_directory, site_url, modified_files):
    """Process a single Markdown file. Returns True if modified."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    match = yaml_regex.search(content)
    if match:
        frontmatter_content = match.group(1)
        frontmatter_dict = yaml.safe_load(frontmatter_content.split('---')[1].strip())
        
        # Skip if Bluesky URL already exists (existing logic)
        if 'bluesky_url' in frontmatter_dict and frontmatter_dict['bluesky_url']:
            print(f"Skipping {file_path} - Bluesky URL already exists")
            return False

        # Existing date handling (unchanged)
        created_date = frontmatter_dict['date']['created']
        created_date_str = f"{created_date}"
        created_date = datetime.datetime.fromisoformat(created_date_str)
        current_date = datetime.datetime.now()
        difference = (current_date - created_date).days
        if difference > 5:        
            print(f"Skipping {file_path} - Post is older than 5 days")
            return False

        # Existing URL generation and Bluesky posting (unchanged)
        yyyy = created_date.year
        mm = f"{created_date.month:02}"
        dd = f"{created_date.day:02}"
        slug_value = frontmatter_dict['slug']
        title_value = frontmatter_dict['title']
        description_value = frontmatter_dict.get('description', '')
        url = f"{site_url}/{yyyy}/{mm}/{dd}/{slug_value}.html"
        image_path = f"{image_directory}/{file_path.split('/')[-1].split('.')[0]}.png"

        # Existing Bluesky post creation (unchanged)
        bluesky_url = create_bluesky_post(url, title_value, description_value, image_path, access_token, at_client)
        if not bluesky_url:
            print(f"Failed to create Bluesky post for {file_path}")
            return False

        # Update frontmatter (existing logic)
        post = frontmatter.load(file_path)
        post.metadata['bluesky_url'] = bluesky_url
        with open(file_path, 'w') as f:
            f.write(frontmatter.dumps(post))
        
        print(f"Updated {file_path} with Bluesky URL: {bluesky_url}")
        return True
    return False

def create_bluesky_post(url, title, description, image_path, access_token, at_client):
    """Create a Bluesky post and return the post URL."""
    try:
        # Upload image
        with open(image_path, 'rb') as img_file:
            img_data = img_file.read()
        
        blob_resp = requests.post(
            "https://bsky.social/xrpc/com.atproto.repo.uploadBlob",
            headers={
                "Content-Type": "image/png",
                "Authorization": f"Bearer {access_token}",
            },
            data=img_data,
        )
        blob_resp.raise_for_status()
        
        # Create post with link card
        card = {
            "uri": url,
            "title": title,
            "description": description,
            "thumb": blob_resp.json()["blob"]
        }
        
        embed_post = {"$type": "app.bsky.embed.external", "external": card}
        post_response = at_client.send_post(text='Check out the latest post on my blog.', embed=embed_post)
        
        # Extract post ID and return full URL
        post_id = post_response.uri.split('/')[-1]
        return f"https://bsky.app/profile/ankit.dumatics.com/post/{post_id}"
    
    except Exception as e:
        print(f"Error creating Bluesky post: {e}")
        return None

def main():
    """Main function to set up and run the script."""
    # Environment variables
    BLUESKY_HANDLE = os.environ.get('BSKY_HANDLE')
    BLUESKY_APP_PASSWORD = os.environ.get('BSKY_APP_PWD')
    GITHUB_TOKEN = os.environ.get('GH_TOKEN')
    
    if not all([BLUESKY_HANDLE, BLUESKY_APP_PASSWORD, GITHUB_TOKEN]):
        raise ValueError("Missing required environment variables")

    # Setup Git repository
    repo = Repo(os.getcwd())
    if is_last_commit_by_script(repo):
        print("Last commit was made by this script. Exiting to prevent cyclic runs.")
        return
    origin = repo.remote(name="origin")
    origin.set_url(f"https://{GITHUB_TOKEN}@github.com/pubmania/pubmania.github.io.git")

    # Bluesky client setup
    at_client = Client()
    at_client.login(BLUESKY_HANDLE, BLUESKY_APP_PASSWORD)
    
    # Get other parameters
    path = 'docs/posts'
    image_directory = os.path.join(os.environ['GITHUB_WORKSPACE'], 'site', 'assets', 'images', 'social', 'posts')
    site_url = os.environ['SITE_URL']
    
    # Process posts
    get_yaml_frontmatter(path, 
                       requests.Session().post(
                           "https://bsky.social/xrpc/com.atproto.server.createSession",
                           json={"identifier": BLUESKY_HANDLE, "password": BLUESKY_APP_PASSWORD}
                       ).json()["accessJwt"],
                       at_client,
                       image_directory,
                       site_url,
                       repo)

if __name__ == "__main__":
    main()