let imageId = 5412 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetch(imageURL)
  .then((resp) => resp.json())
  .then((json) => addImageDetails(json))
  .catch((err) => console.error(err))
})

function addImageDetails(image) {
  // Image card
  document.getElementById('image').setAttribute('src', image.url)
  document.getElementById('name').innerText = image.name
  document.getElementById('likes').innerText = image.like_count
  
  // Comments
  const ul = document.getElementById('comments')
  for (comment of image.comments) {
    renderComment(ul, comment)
  }

  // Like button
  document.getElementById('like_button').addEventListener('click', addLike)

  // Comment submittal
  document.getElementById('comment_form').addEventListener('submit', addComment)
}

function renderComment(ul, comment) {
  const li = document.createElement('li')
  li.innerText = `${comment.content} `

  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'X'
  deleteButton.setAttribute('data-comment-id', comment.id)
  deleteButton.addEventListener('click', deleteComment)
    
  li.appendChild(deleteButton)

  ul.appendChild(li)
}

function addLike(event) {
  const likes = document.getElementById('likes')
  likes.innerText = parseInt(likes.innerText) + 1

  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({image_id: imageId})
  })
  .catch((err) => console.error(err))

}

function addComment(event) {
  event.preventDefault()

  const ul = document.getElementById('comments')
  
  fetch(commentsURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( { image_id: imageId, content: event.target.comment_input.value })
  })
  .then((resp) => resp.json())
  .then((comment) => {
    renderComment(ul, comment)
  })

  event.target.comment_input.value = ''
}

function deleteComment(event) {
  comment_id = event.target.getAttribute('data-comment-id')

  fetch(`${commentsURL}/${comment_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( { image_id: imageId } )
  })
  .then((resp) => resp.json())
  .then((json) => {
    if (json.message) {
      event.target.parentNode.remove()
    }
  })
  .catch((err) => console.error(err))
}

