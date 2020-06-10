document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  new ImageAppController();
});

class ImageAppController {
  imageId = 5414 //Enter the id from the fetched image here
  imageURL = `https://randopic.herokuapp.com/images/${this.imageId}`
  likeURL = `https://randopic.herokuapp.com/likes/`
  commentsURL = `https://randopic.herokuapp.com/comments/`

  // UI Components
  imageEl = document.querySelector('#image');
  imageNameEl = document.querySelector('#name');
  likeBtn = document.querySelector('#like_button');
  commentForm = document.querySelector('#comment_form');
  commentsUl = document.querySelector('#comments');
  likesEl = document.querySelector('#likes');

  constructor() {
    this.fetchImage(this.imageURL).then(imgObj => {
      
      // Set image content
      this.imageEl.src = imgObj.url;
      this.imageNameEl.textContent = imgObj.name;

      // Set comments
      this.updateComments(imgObj.comments);

      // Set likes
      this.updateLikes(imgObj.like_count);

      // Add Event Listeners
      this.likeBtn.addEventListener('click', e => this.createLike().then(() => this.updateLikes(1)));
      this.commentForm.addEventListener('submit', e => {
        e.preventDefault();
        let comment = e.target.comment.value;
        if (comment.trim() != "") this.createComment(comment).then(commentObj => this.updateComments([commentObj]));
      })
    });
  }

  /*
    Fetches image using imageURL
  */
  async fetchImage() {
    return await fetch(this.imageURL).then(res => res.json()).then(json => json);
  }
  
  /*
    Creates a new comment with the current image id and comment
      - comment: comment text
  */
  async createComment(comment) {
    return await fetch(this.commentsURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          image_id: this.imageId,
          content: comment
      })
    }).then(res => res.json()).then(json => json);
  }
  
  /*
    Creates a new like in the db
  */
  async createLike() {
    return await fetch(this.likeURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          image_id: this.imageId
      })
    }).then(res => res.json()).then(json => json);
  }

  /*
    Updates the likes count in the view
      - likesCount: amount of likes to add
  */
  updateLikes(likesCount) {
    this.likesEl.textContent = Number.isNaN(parseInt(this.likesEl.textContent)) ? likesCount : parseInt(this.likesEl.textContent) + likesCount;
  }
  
  /*
    Adds Comments to page
      - comments: array of comment objs
  */
  updateComments(comments) {
    comments.forEach(comment => {
      let commentLi = document.createElement('li');
      commentLi.textContent = comment.content;
      let deleteCommentBtn = document.createElement('button');
      deleteCommentBtn.textContent = "delete";
      deleteCommentBtn.setAttribute("comment-id", comment.id);
      deleteCommentBtn.addEventListener('click', e => this.deleteComment(e));
      commentLi.appendChild(deleteCommentBtn);
      this.commentsUl.appendChild(commentLi);
    })
    document.querySelector('#comment_input').value = "";
  }
  
  /*
    Deletes a comment from db then removes comment from view
      - event: click event from delete comment button event listener
  */
  deleteComment(event) {
    fetch(`${this.commentsURL}${event.target.getAttribute("comment-id")}`, {
      method: "DELETE"
    }).then(res => res.json()).then(json => event.target.parentNode.remove());
  }
}