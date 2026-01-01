export class BlueskyComments extends HTMLElement {
  static properties = {
    /** The URL of the Bluesky post to use as the parent */
    url: { type: String },
  };

  #observer;
  #loaded = false;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      /* Bluesky Comments CSS */

      /* Container Styles */
      .comments {
        font-family: var(--bluesky-font-family);
        font-size: var(--bluesky-font-size);
        background-color: var(--bluesky-bg-color);
        color: var(--bluesky-text-color);
      }
      
      .conversation a {
        color: var(--md-typeset-a-color)
      }
      /* Parent Metrics*/
      .parent-metrics {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin: 2rem 0;
        padding: 1rem;
        border-top: 1px solid var(--bluesky-border-color);
        border-bottom: 1px solid var(--bluesky-border-color);
      }

      .parent-metrics .metric {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }

      .parent-metrics .count {
        font-size: 1.5em;
        font-weight: bold;
        color: var(--bluesky-text-color);
      }

      .parent-metrics .label {
        font-size: 0.9em;
        color: var(--bluesky-handle-color);
        text-transform: uppercase;
      }

      .comments-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--md-hr-color);
      }

      #__comments {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--md-hr-color);
        font-size: 1.6em;
        margin: 0 0 0 0;
      }

      .twemoji {
        display: inline-flex;
        width: 1em;
        height: 1em;
        font-size: 1.6em;
      }

      .twemoji svg {
        width: 1em;
        height: 1em;
        fill: var(--md-hr-color);
      }
    
      /* Comment Structure */
      .comment {
        border: 1px solid var(--bluesky-border-color);
        border-radius: 1rem;
        padding-top: var(--bluesky-spacing-lg);
        margin: 0.5rem;
      }

      .comment.reply {
        margin-left: var(--bluesky-spacing-lg);
        padding-top: var(--bluesky-spacing-xs);
      }

      .comment-content {
        padding: var(--bluesky-spacing-xs) 0;
      }

      .avatar {
        width: var(--bluesky-avatar-size);
        height: var(--bluesky-avatar-size);
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid var(--bluesky-border-color);
      }

      .default-avatar {
        width: var(--bluesky-avatar-size);
        height: var(--bluesky-avatar-size);
        border-radius: 50%;
        background-color: var(--bluesky-avatar-bg);
      }

      .comment-header {
        display: flex;
        align-items: center;
        gap: var(--bluesky-spacing-md);
        padding: 0 var(--bluesky-spacing-lg);
      }

      .comment-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--bluesky-spacing-xs);
        font-size: var(--bluesky-footer-font-size);
        color: var(--bluesky-footer-text-color);
        padding: var(--bluesky-spacing-xs);
      }

      .comment-footer div {
        display: flex;
        align-items: center;
        gap: var(--bluesky-spacing-xs);
      }

      .comment-link {
        display: flex;
        flex-direction: column;
        color: inherit;
        text-decoration: none;
        padding: 0 var(--bluesky-spacing-lg);
        margin: 0.1rem;
      }

      .profile-link {
        color: var(--bluesky-text-color);
        font-weight: 600;
        text-decoration: none;
      }

      .timestamp-link,
      .handle-link {
        color: var(--bluesky-handle-color);
        text-decoration: none;
      }

      .comment-link:hover,
      .comment-footer:hover {
        background-color: var(--bluesky-hover-bg);
        border-radius: 1rem;
      }

      .profile-link:hover {
        text-decoration: underline;
      }

      .handle {
        color: var(--bluesky-handle-color);
      }

      .comment-footer svg {
        width: var(--bluesky-icon-size);
        height: var(--bluesky-icon-size);
        color: var(--bluesky-footer-text-color);
      }

      /* New media styles */
      .media-container {
        margin: 1rem 0;
        display: grid;
        gap: 0.5rem;
      }

      .image-wrapper {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
      }

      .image-wrapper img {
        width: 100%;
        height: auto;
        max-height: 400px;
        object-fit: contain;
        border-radius: 8px;
      }

      .external-card {
        border-radius: 8px;
        padding: 0.5rem;
        display: flex;
        gap: 1rem;
      }

      .external-card img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 4px;
      }

      .external-card div {
        flex: 1;
      }
    </style>
    <div class="comments"></div>`;
    this.#observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.#loaded) {
            this.#loadComments();
            this.#loaded = true;
            this.#observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
  }

  connectedCallback() {
    this.#observer.observe(this);
  }

  disconnectedCallback() {
    this.#observer.disconnect();
  }

  async #loadComments() {      
    const currentUrl = window.location.href;
    const deconstructedurl = new URL(currentUrl);
    const extractedPart = deconstructedurl.pathname;
    const assembledUrl = "https://mgw.dumatics.com" + extractedPart;

    try {
        const blueskyUrl = this.getAttribute("url");
        if (blueskyUrl) {
            const atUri = await this.#resolvePostUrl(blueskyUrl);
            if (!atUri) {
                throw new Error("Failed to resolve AT URI");
            }
            
            const urlParts = atUri.split("/");
            const postId = urlParts[4];
            
            // Fetch the thread data first
            const thread = await this.#fetchReplies(atUri);
            
            // Create parent metrics HTML
            const parentMetrics = this.#createParentMetrics(thread.post);
            
            // Update DOM with new structure
            this.shadowRoot.querySelector(".comments").innerHTML = `
                ${parentMetrics}
                <div class="comments-header">
                  <h2 id="__comments">
                      <span class="twemoji" style="margin-right: 10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm160 215.4c14.5-30 54-85.8 90.7-113.3 26.5-19.9 69.3-35.2 69.3 13.7 0 9.8-5.6 82.1-8.9 93.8-11.4 40.8-53 51.2-90 44.9 64.7 11 81.2 47.5 45.6 84-67.5 69.3-97-17.4-104.6-39.6l-.3-.9c-.9-2.6-1.4-4.1-1.8-4.1s-.9 1.5-1.8 4.1l-.3.9c-7.6 22.2-37.1 108.8-104.6 39.6-35.5-36.5-19.1-73 45.6-84-37 6.3-78.6-4.1-90-44.9-3.3-11.7-8.9-84-8.9-93.8 0-48.9 42.9-33.5 69.3-13.7 36.7 27.5 76.2 83.4 90.7 113.3"></path></svg>
                      </span>
                      Comments
                  </h2>
                </div>
                <p class="conversation">
                    <a href="https://bsky.app/profile/ankit.dumatics.com/post/${postId}" target="_blank">
                        Join the conversation on Bluesky....
                    </a>
                </p>`;
            
            // Display replies
            this.#displayReplies(thread, this.shadowRoot.querySelector(".comments"));
        } else {
            this.shadowRoot.querySelector(".comments").innerHTML =
                `<p>No Bluesky Comments thread found for this post.</p>`;
        }
    } catch (e) {
        console.error("Comments loading failed:", e);
        this.shadowRoot.querySelector(".comments").innerHTML =
            `<p>Error loading comments. <a href="https://bsky.app/profile/ankit.dumatics.com" target="_blank">Visit our Bluesky profile</a></p>`;
    }
}

#createParentMetrics(post) {
    const likeCount = post.likeCount || 0;
    const repostCount = post.repostCount || 0;
    const replyCount = post.replyCount || 0;

    return `
        <div class="parent-metrics">
            <div class="metric">
                <span class="count">${repostCount}</span>
                <span class="label">Reposts</span>
            </div>
            <div class="metric">
                <span class="count">${likeCount}</span>
                <span class="label">Likes</span>
            </div>
            <div class="metric">
                <span class="count">${replyCount}</span>
                <span class="label">Replies</span>
            </div>
        </div>`;
}

  async #resolvePostUrl(postUrl) {
    let atUri;

    if (postUrl.startsWith("at:")) {
      return postUrl;
    }

    if (!postUrl.startsWith("https://bsky.app/")) {
      return undefined;
    }

    const urlParts = new URL(postUrl).pathname.split("/");
    let did = urlParts[2];
    const postId = urlParts[4];

    if (!did || !postId) {
      return undefined;
    }

    if (!did.startsWith("did:")) {
      const cachedDid = this.#getCache(`handle:${did}`);
      if (cachedDid) {
        did = cachedDid;
      } else {
        try {
          const handleResolutionUrl = `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(
            did,
          )}`;
          const handleResponse = await fetch(handleResolutionUrl);

          if (!handleResponse.ok) {
            throw new Error("Failed to resolve handle");
          }

          const handleData = await handleResponse.json();
          if (!handleData.did) {
            return undefined;
          }

          this.#setCache(`handle:${did}`, handleData.did, 86400);
          did = handleData.did;
        } catch (e) {
          console.error(`[error] Failed to resolve handle: ${e.message || e}`);
          return undefined;
        }
      }
    }

    atUri = `at://${did}/app.bsky.feed.post/${postId}`;
    return atUri;
  }

  #setCache(key, value, ttl = 86400) {
    const expiry = Date.now() + ttl * 1000;
    const cacheData = { value, expiry };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  #getCache(key) {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;

    const { value, expiry } = JSON.parse(cachedItem);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  }

  async #fetchReplies(atUri) {
    const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(
      atUri,
    )}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch replies");
    }
    const data = await response.json();
    return data.thread;
  }

  #displayReplies(thread, container = null) {
    const commentsContainer =
      container || this.shadowRoot.querySelector(".comments");
    if (thread && thread.replies && thread.replies.length > 0) {
      const sortedReplies = thread.replies.sort((a, b) => {
        return (
          new Date(a.post.record.createdAt).getTime() -
          new Date(b.post.record.createdAt).getTime()
        );
      });
      sortedReplies.forEach((reply) => {
        this.#displayComments(reply, commentsContainer, false);
      });
    }
  }

  #sanitizeText(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  #displayComments(thread, container, isReply = false) {
    if (thread?.post?.author && thread.post.record) {
      if (thread.post.record.text.trim() === "📌") {
        return;
      }

      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      if (isReply) {
        commentDiv.classList.add("reply");
      }

      const authorHandle = thread.post.author.handle;
      const authorDid = thread.post.author.did;
      const authorProfileUrl = `https://bsky.app/profile/${thread.post.author.did}`;
      const postUrl = `https://bsky.app/profile/${
        thread.post.author.did
      }/post/${thread.post.uri.split("/").pop()}`;
      const createdAt = new Date(thread.post.record.createdAt);
      const createdAtFull = createdAt.toLocaleString();
      const createdAtAbbreviated = this.#getAbbreviatedTime(createdAt);
      const avatarUrl = thread.post?.author?.avatar.replace(
        "/img/avatar/",
        "/img/avatar_thumbnail/",
      );
      const displayName = thread.post.author.displayName || authorHandle;
      const likeCount = thread.post.likeCount || 0;
      const repostCount = thread.post.repostCount || 0;
      const replyCount = thread.post.replyCount || 0;

      let avatarElement;
      if (avatarUrl) {
        avatarElement = `<img src="${avatarUrl}" alt="${authorHandle}'s avatar" class="avatar" part="avatar"/>`;
      } else {
        avatarElement = `<div class="default-avatar" part="avatar"></div>`;
      }

      commentDiv.innerHTML = `
        <div class="comment-header" part="comment-header">
          ${avatarElement}
          <div>
            <a href="${authorProfileUrl}" target="_blank" class="profile-link">${this.#sanitizeText(displayName)}</a>
            <span class="handle"><a href="${authorProfileUrl}" target="_blank" class="handle-link">@${this.#sanitizeText(authorHandle)}</a></span> -
            <a href="${postUrl}" target="_blank" rel="ugc" title="${createdAtFull}" class="timestamp-link">${createdAtAbbreviated}</a>
          </div>
        </div>
        <div class="comment-body" part="comment-body">
          <a href="${postUrl}" target="_blank" rel="nofollow noopener" class="comment-link">
            <div class="comment-content" part="comment-content">
              ${this.#sanitizeText(thread.post.record.text)}
            </div>`;

      // Add media embeds
      if (thread.post.embed) {
        const mediaContainer = document.createElement("div");
        mediaContainer.classList.add("media-container");
        this.#renderEmbed(thread.post.embed, mediaContainer);
        commentDiv.querySelector(".comment-body").appendChild(mediaContainer);
      }

      // Add footer
      commentDiv.querySelector(".comment-body").innerHTML += `
            <div class="comment-footer" part="comment-footer">
              <div>
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M2.002 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H12.28l-4.762 2.858A1 1 0 0 1 6.002 21v-2h-1a3 3 0 0 1-3-3V6Zm3-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v1.234l3.486-2.092a1 1 0 0 1 .514-.142h7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-14Z"></path>
                </svg>
                <span>${replyCount}</span>
              </div>
              <div>
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M17.957 2.293a1 1 0 1 0-1.414 1.414L17.836 5H6a3 3 0 0 0-3 3v3a1 1 0 1 0 2 0V8a1 1 0 0 1 1-1h11.836l-1.293 1.293a1 1 0 0 0 1.414 1.414l2.47-2.47a1.75 1.75 0 0 0 0-2.474l-2.47-2.47ZM20 12a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3H6.164l1.293 1.293a1 1 0 1 1-1.414 1.414l-2.47-2.47a1.75 1.75 0 0 1 0-2.474l2.47-2.47a1 1 0 0 1 1.414 1.414L6.164 17H18a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1Z"></path>
                </svg>
                <span>${repostCount}</span>
              </div>
              <div>
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.734 5.091c-1.238-.276-2.708.047-4.022 1.38a1 1 0 0 1-1.424 0C9.974 5.137 8.504 4.814 7.266 5.09c-1.263.282-2.379 1.206-2.92 2.556C3.33 10.18 4.252 14.84 12 19.348c7.747-4.508 8.67-9.168 7.654-11.7-.541-1.351-1.657-2.275-2.92-2.557Zm4.777 1.812c1.604 4-.494 9.69-9.022 14.47a1 1 0 0 1-.978 0C2.983 16.592.885 10.902 2.49 6.902c.779-1.942 2.414-3.334 4.342-3.764 1.697-.378 3.552.003 5.169 1.286 1.617-1.283 3.472-1.664 5.17-1.286 1.927.43 3.562 1.822 4.34 3.764Z"></path>
                </svg>
                <span>${likeCount}</span>
              </div>
            </div>
          </a>
        </div>`;

      container.appendChild(commentDiv);

      if (thread.replies && thread.replies.length > 0) {
        const sortedReplies = thread.replies.sort((a, b) => {
          return (
            new Date(a.post.record.createdAt).getTime() -
            new Date(b.post.record.createdAt).getTime()
          );
        });
        sortedReplies.forEach((reply) => {
          this.#displayComments(reply, commentDiv, true);
        });
      }
    }
  }

  #renderEmbed(embed, container) {
    if (embed?.$type === 'app.bsky.embed.images#view') {
      this.#renderImages(embed.images, container);
    } else if (embed?.$type === 'app.bsky.embed.external#view') {
      this.#renderExternal(embed.external, container);
    } else if (embed?.$type === 'app.bsky.embed.recordWithMedia#view') {
      this.#renderRecordWithMedia(embed, container);
    }
  }

  #renderImages(images, container) {
    images.forEach(image => {
      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("image-wrapper");
      
      const img = document.createElement("img");
      img.src = image.fullsize;
      img.alt = image.alt || 'Bluesky post image';
      img.loading = 'lazy';
      
      imgWrapper.appendChild(img);
      container.appendChild(imgWrapper);
    });
  }

  #renderExternal(external, container) {
    const link = document.createElement("a");
    link.href = external.uri;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    const card = document.createElement("div");
    card.classList.add("external-card");
    
    if (external.thumb) {
      const img = document.createElement("img");
      img.src = external.thumb;
      img.alt = external.title || 'External content preview';
      card.appendChild(img);
    }
    
    const text = document.createElement("div");
    text.innerHTML = `
      <strong>${this.#sanitizeText(external.title)}</strong>
      <p>${this.#sanitizeText(external.description)}</p>
      <small>${new URL(external.uri).hostname}</small>
    `;
    
    card.appendChild(text);
    link.appendChild(card);
    container.appendChild(link);
  }

  #renderRecordWithMedia(embed, container) {
    if (embed.media?.$type === 'app.bsky.embed.images#view') {
      this.#renderImages(embed.media.images, container);
    }
    // Add handling for other media types if needed
  }
  
    #getAbbreviatedTime(date) {
    const now = new Date().getTime();
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d`;
    } else if (diffHours > 0) {
      return `${diffHours}h`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m`;
    } else {
      return `${diffSeconds}s`;
    }
  }
}