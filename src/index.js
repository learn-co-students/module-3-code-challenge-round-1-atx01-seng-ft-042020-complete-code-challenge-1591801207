document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5413 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

let likes = 0
const likeBut = document.getElementById("like_button")
imageData = fetch('https://randopic.herokuapp.com/images/5413')
let myImg = document.getElementById("image")
let commentForm = document.getElementById("comment_form")

myImg = imageData

likeBut.addEventListener('click', event => {
  likes++
  document.getElementById("likes").innerHTML = `${likes}`
})

commentForm.addEventListener('submit', event => {

})

//i was stuck trying to access the properties inside the image data and didnt realize i lost so much time