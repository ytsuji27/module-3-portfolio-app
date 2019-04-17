console.log('comments.js running...')

//// ----------  CONSTANTS  ---------- ////
// const COMMENTS_URL = "http://localhost:3000/api/v1/comments";
const COMMENTS_URL = "https://glacial-cove-71236.herokuapp.com/api/v1/comments";
const commentsDiv = document.getElementById("comments");
let photoCard;  // Assigned when shown commentIterator
let commentList; //
let commentForm;



class Comment {

  constructor(user, content, photo) {
    this.user = user;
    this.content = content;
    this.photo = photo;
  }


  // Fetch data on showPhotoPage (from index.js)
  static fetchComments(photo) {
    fetch(COMMENTS_URL)
    .then(resp => resp.json())
    .then(data => Comment.buildList(photo, data))
  }

  // Return assembled <ul class="comment-list">
  static buildList(photo, comments) {
    photoCard = document.getElementsByClassName('photo-card')[0];
    // Create empty <ul class="comment-list">
    commentList = document.createElement('ul');
    commentList.classList.add('comment-list');
    // Filter all comments based on photo id
    if (comments.length !== 0) {
      let results = comments.filter(comment => comment.photo_id === photo.photo.id);
      // Iterate through comments and return <li>
      for (const comment of results) {
        let commentLine = Comment.createNewComment(comment);
        commentList.appendChild(commentLine);
      }
    }
    // Creating new comment form
    let commentForm = Comment.commentForm();
    // Appending built list to photo card
    photoCard.appendChild(commentList);
    photoCard.appendChild(commentForm);
  }


  // Return built <li>
  static createNewComment(comment) {
    let user = users.find(function(element) {return element.id === comment.user_id});
    let li = document.createElement('li');
    li.innerHTML = `<span>${user.name}</span>  ${comment.content}`;
    return li;
  }


  // Create new comment form
  static commentForm() {
    const photoCard = document.getElementsByClassName('photo-card')[0];
    let form = document.createElement('form');
    form.setAttribute("id", "newCommentForm");
    form.classList.add('form-newcomment');
    form.innerHTML = `
      <input id="inputComment" placeholder="Add a comment...">
      <button type="submit" class="btn btn-outline-dark">
        <i id="paper-plane" class="fa fa-paper-plane"></i>
      </button>
    `
    form.addEventListener('submit', (ev) => Comment.newComment(ev));
    return form;
  }


  // Handles new comments
  static newComment(ev) {
    ev.preventDefault();
    let content = ev.target[0].value;
    let photoID = ev.target.parentElement.getAttribute('photo-id');
    const commentForm = document.getElementById('newCommentForm');
    commentForm.reset();
    fetch(COMMENTS_URL, {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({
        user: currentUser,
        content: content,
        photo_id: photoID
      })
    })
    .then(resp => resp.json())
    .then(data => {
      let li = Comment.createNewComment(data);
      commentList.appendChild(li);
    })
  }

}
