document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = '5411'

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch('https://randopic.herokuapp.com/images/5411')
    .then(response => response.json())
    .then(json => renderImage(json));



})
const likeButton = document.getElementById('like_button');
const likes = document.getElementById('likes');

likeButton.addEventListener('click', (e) => {
  likes.innerHTML ++;
  console.log(likes.innerHTML);
});

let commentForm = document.getElementById('comment_form')

const all = [];

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const p = document.createElement('p');

  p.style.color = 'black';
  
  const pRemove = document.createElement('button');
  pRemove.innerText = 'remove';
  const commentInput = document.getElementById('comment_input');


  

  console.log("submit");
  

  pRemove.addEventListener('click', (e) => {
      const indexedParagraph = all.indexOf(p);
      p.remove();
      all.splice(indexedParagraph, 1);
      console.log("removed");
      renderComments();
  });

  p.appendChild(pRemove);
  all.push(p);
  renderComments();

  commentInput.value = ''
});

function renderComments(){
  const commentList = document.getElementById('comments');
  commentList.innerHTML = '';
  all.forEach(p => commentList.appendChild(p))
}
 


commentForm.addEventListener('input', (e) => {

  console.log(e.target.value);
});


likes.innerHTML
function renderImage(img){
  console.table(img)
  const imageCard = document.getElementById('image_card');
  const image = document.getElementById('image');
  const name = document.getElementById('name');
   
  console.log(image.src);
  
  console.log(imageCard);
}