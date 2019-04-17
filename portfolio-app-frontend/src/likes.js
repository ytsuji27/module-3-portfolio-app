console.log('likes.js running...')

//// ----------  CONSTANTS  ---------- ////
// const LIKE_URL = "http://localhost:3000/api/v1/likes";
const LIKE_URL = "https://glacial-cove-71236.herokuapp.com/api/v1/likes";
let results = []; // Will store likes for photo
let alreadyLiked = false; // Status if current user has already liked current photo

class Likes {

  // Fetch all likes
  static fetchLikes(photo) {
    fetch(LIKE_URL)
    .then(resp => resp.json())
    .then(data => Likes.likeFilter(data, photo))
  }


  // Returns only likes for the photo
  static likeFilter(likes, photo) {
    if (likes.length !== 0) {
      results = likes.filter(like => like.photo_id === photo.photo.id);
      let numberLikes = results.length;
      Likes.setLikes(numberLikes);
      let liked = results.filter(like => like.user_id === currentUser.id);
      if (liked.length !== 0) {
        alreadyLiked = true;
        let heart = document.getElementById('heart');
        heart.style.color = "red";
      }
    }
  }


  // Set number of likes on initial load
  static setLikes(number) {
    let likeCount = document.getElementById('likes').children[1];
    let likeText = document.getElementById('likes').children[2];
    likeCount.textContent = number;
    if (number === 1) {
      likeText.textContent = ' like';
    }
  }


  // Triggered from showPhotoPage click event
  static liked(ev) {
    ev.preventDefault();
    let photoID = ev.target.parentElement.parentElement.parentElement.getAttribute('photo-id');
    if (alreadyLiked) {
      Likes.decreaseLike(photoID);
      return;
    }
    console.log('Liked!');
    alreadyLiked = true;
    fetch(LIKE_URL, {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({
        user: currentUser,
        photo_id: photoID
      })
    })
    .then(resp => resp.json())
    .then(data => {
      results.push(data);
      Likes.increaseLike();
    })
  }


  // Increase like count when liked
  static increaseLike() {
    let likeCount = document.getElementById('likes').children[1];
    let likeText = document.getElementById('likes').children[2];
    let heart = document.getElementById('heart');
    likeCount.textContent++;
    heart.style.color = "red";
    if (likeCount.textContent === "1") {
      likeText.textContent = ' like';
    } else {
      likeText.textContent = ' likes';
    }
  }


  // Decrease like count
  static decreaseLike(photoID) {
    console.log('Disliked!');
    alreadyLiked = false;
    let likeID;
    // Front End
    let likeCount = document.getElementById('likes').children[1];
    let likeText = document.getElementById('likes').children[2];
    likeCount.textContent--;
    let heart = document.getElementById('heart');
    heart.style.color = "black";
    if (likeCount.textContent === "1") {
      likeText.textContent = ' like';
    } else {
      likeText.textContent = ' likes';
    }
    results.forEach(function(like) {
      if (like.user_id === currentUser.id) {
        likeID = like.id;
      }
    })
    results = results.filter(like => like.user_id !== currentUser.id);
    // Back End
    fetch(`${LIKE_URL}/${likeID}`, {
      method: 'DELETE'
    })
  }


}
