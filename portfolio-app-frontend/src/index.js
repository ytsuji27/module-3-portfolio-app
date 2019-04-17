console.log('index.js running...')

//// ----------  CONSTANTS  ---------- ////
const loginPage = document.getElementById("loginPage");
const photoPage = document.getElementById("showPhoto");
const mainPhoto = document.getElementById("mainPhoto");
const loginForm = document.getElementById("loginForm");
const allPhotos = document.getElementById("allPhotos");
const newPhoto = document.getElementById("newPhoto");
const greeting = document.getElementById("greeting");
const newPhotoDiv = document.getElementById("newPhotoDiv");
const logoutOption = document.getElementById("logoutOption");
const newPhotoCard = document.getElementById("newPhotoCard");
// const PHOTOS_URL = "http://localhost:3000/api/v1/photos";
const PHOTOS_URL = "https://glacial-cove-71236.herokuapp.com/api/v1/photos";
// const USERS_URL = "http://localhost:3000/api/v1/users";
const USERS_URL = "https://glacial-cove-71236.herokuapp.com/api/v1/users";
const fetchHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
let currentUser; // Changes to whoever is logged in
let users = []; // To be filled with list of users on page load

//// ----------  EVENT LISTENERS  ---------- ////
// Login Submit
loginForm.addEventListener('submit', (ev) => login(ev));
// Logout
logoutOption.addEventListener('click', (ev) => logout(ev));
// Event Listener for clicking outside show photo div
document.addEventListener('click', (ev) => {
  if (ev.target.classList[0] === "overlay" || ev.target.id === "mainPhoto") {
    hidePhotoPage();
  }
})
// Add photo Form Submit
newPhoto.addEventListener('submit', (ev) => createPhoto(ev));
// Add new photo plus click
newPhotoCard.addEventListener('click', (ev) => showNewPhotoPage());
// Event Listener for clicking outside upload photo div
document.addEventListener('click', (ev) => {
  if (ev.target.id === "newPhotoDiv") {
    hideNewPhotoPage();
  }
})

//// ----------  SHOW/HIDE OVERLAY FUNCTIONS  ---------- ////
// Shows Login overlay
function showLoginPage() {
  loginPage.style.display = "block";
}

// Hides Login overlay
function hideLoginPage() {
  loginPage.style.display = "none";
}

// Hides Photo page overlay
function hidePhotoPage() {
  photoPage.style.display = "none";
}

// Shows New Photo overlay
function showNewPhotoPage() {
  newPhotoDiv.style.display = "block";
}

// Hides New Photo overlay
function hideNewPhotoPage() {
  newPhotoDiv.style.display = "none";
}

//// ----------  SHOW PAGE OVERLAY  ---------- ////
function showPhotoPage(ev, photo) {
  // Display view
  photoPage.style.display = "block";
  // Clearing page
  while (mainPhoto.firstChild) {
    mainPhoto.firstChild.remove();
  }
  results = [];
  alreadyLiked = false;
  // Creating main <div class="photo-card">
  let photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');
  photoCard.setAttribute("photo-id", photo.photo.id);
  // Creating <img>
  let img = document.createElement('img');
  img.src = photo.url;
  // Create wrapper for text
  let wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  // Creating <div>Caption
  let caption = document.createElement('div');
  caption.id = 'caption';
  caption.textContent = `Caption: ${photo.photo.caption}`;
  // Creating <div>Photographer
  let photographer = document.createElement('div');
  photographer.id = 'photographer';
  photographerUser = users.filter(user => user.id === photo.photo.user_id)[0];
  photographer.textContent = `Photo by: ${photographerUser.name}`;
  // Creating <div>Likes
  let likes = document.createElement('div');
  likes.id = 'likes';
  likes.innerHTML = `
    <button type="submit" class="like-button">
      <i id="heart" class="fa fa-heart"></i>
    </button>
    <span>0</span><span> Likes</span>
  `
  likes.firstElementChild.firstElementChild.addEventListener('click', (ev) => Likes.liked(ev))
  // Putting it altogether
  wrapper.append(caption, photographer);
  photoCard.append(img, wrapper, likes);
  mainPhoto.appendChild(photoCard);
  // Passing it off to comments.js to create comments section
  Comment.fetchComments(photo);
  // Passing it off to likes.js to fetch likes
  Likes.fetchLikes(photo);
}


// Fetch users
function fetchUsers() {
  fetch(USERS_URL)
  .then(resp => resp.json())
  .then(data => {
    users = data
  })
}


// Fetch data on initialize
function fetchPhotos() {
  fetch(PHOTOS_URL)
  .then(resp => resp.json())
  .then(data => photoIterator(data))
}


// Iterate through photos on initial load
function photoIterator(array) {
  for (const photo of array) {
    displayPhoto(photo);
  }
}


// Display photo on gallery
function displayPhoto(photo) {
  let galleryCard = document.createElement('div');
  galleryCard.classList.add('gallery-card');
  galleryCard.classList.add('gallery-item');
  let img = document.createElement('img');
  img.src = photo.url;
  img.classList.add('gallery-img');
  galleryCard.appendChild(img);
  galleryCard.addEventListener('click', (ev) => showPhotoPage(ev, photo))
  allPhotos.appendChild(galleryCard);
}


// Create a new Photo
function createPhoto(ev) {
  ev.preventDefault();
  let formData = new FormData();
  formData.append('caption', ev.target[1].value);
  formData.append('user', currentUser.name);
  formData.append('photo_source', ev.target[0].files[0]);
  newPhoto.reset();
  hideNewPhotoPage();
  fetch(PHOTOS_URL, {
    method: 'POST',
    body: formData
  })
  .then(resp => resp.json())
  .then(data => displayPhoto(data))
}

//// ----------  LOGIN/LOGOUT FUNCTIONS  ---------- ////
// Login function (Sets current user)
function login(ev) {
  ev.preventDefault();
  let name = ev.target[0].value;
  let foundUser = users.find(function(element) {
    return element.name === name;
  });
  loginForm.reset();
  if (!foundUser) {
    fetch(USERS_URL, {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({name: name})
    })
    .then(resp => resp.json())
    .then(data => {
      users.push(data);
      currentUser = data;
      console.log(`Logged in as ${currentUser.name}`);
      greeting.textContent = `Welcome, ${currentUser.name}`;
      logoutOption.textContent = `Not ${currentUser.name}? Logout`;
      hideLoginPage();
    })
  } else {
    currentUser = foundUser;
    console.log(`Logged in as ${currentUser.name}`);
    greeting.textContent = `Welcome, ${currentUser.name}`;
    logoutOption.textContent = `Not ${currentUser.name}? Logout`;
    hideLoginPage();
  }
}

// Logout (Clears current user)
function logout(ev) {
  currentUser = "";
  console.log('You\'ve been logged out')
  showLoginPage();
  greeting.textContent = "";
  logoutOption.textContent = "";
  results = [];
  alreadyLiked = false;
}




//// ----------  INITIALIZE ON PAGE LOAD  ---------- ////
// Initialize with Login page
fetchPhotos();
fetchUsers();
showLoginPage();
