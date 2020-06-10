let image;
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5410 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
    .then(res => res.json())
    .then(json => {
      image = json;
      renderImageData()
      setLikesButton()
      addFormSubmitListener()
    });

  function renderImageData() {
    renderImage()
    renderImageName()
    renderImageLikes()
    renderImageComments()
  }
  function renderImage() {
    document.getElementById('image').src = image.url;
  }

  function renderImageName() {
    document.getElementById('name').innerText = image.name;
  }

  function renderImageLikes() {
    document.getElementById('likes').innerText = image.like_count;
  }

  function renderImageComments() {
    image.comments.forEach(comment => renderComment(comment))
  }

  function renderComment(comment) {
    let li = document.createElement('li')
    let deleteButton = document.createElement('button')

    li.innerText = comment.content
    li.setAttribute("comment_id", comment.id | 0)
    deleteButton.innerText = 'delete'

    deleteButton.addEventListener('click', e => {
      e.target.parentNode.remove()
      deleteComment(e.target.parentNode.getAttribute('comment_id'))
    })

    li.appendChild(deleteButton)
    document.getElementById('comments').appendChild(li)
  }

  function deleteComment(comment_id) {
    const config = {
      method: "DELETE"
    }
    fetch(commentsURL + `${comment_id}`, config)
      .then(res => res.json())
      .then(json => {
        let comment = image.comments.find(comment => comment.id == comment_id)

        image.comments.splice(image.comments.indexOf(comment), 1)
      })
  }
  function setLikesButton() {
    document.getElementById('like_button').addEventListener('click', e => {
      image.like_count += 1
      renderImageLikes()
      saveLikeCount()
    })
  }

  function saveLikeCount() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image_id: image.id
      })
    }
    fetch(likeURL, config)
  }

  function addFormSubmitListener() {
    const form = document.getElementById('comment_form');
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const comment_input = e.target.comment_input
      if (comment_input.value.match(/([a-zA-Z])/)) {
        renderComment({ content: comment_input.value })
        saveComment(comment_input.value)
        comment_input.value = ""
      } else {
        alert("Comment cannot be blank!")
      }

    })
  }

  function saveComment(comment) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image_id: image.id,
        content: comment
      })
    }
    fetch(commentsURL, config)
      .then(res => res.json())
      .then(json => {
        document.querySelectorAll('li').forEach(li => {
          if (li.getAttribute('comment_id') == 0) {
            li.setAttribute('comment_id', json.id)
          }
        })
        image.comments.push(json)
      })
  }

}) // end of dom content loaded


