console.log('index.js running...')

//// ----------  CONSTANTS  ---------- ////
const loginPage = document.getElementById("loginPage");
const photoPage = document.getElementById("showPhoto");
const loginForm = document.getElementById("loginForm");
const allPhotos = document.getElementById("allPhotos");
const newPhoto = document.getElementById("newPhoto");
const PHOTOS_URL = "http://localhost:3000/api/v1/photos";
const USERS_URL = "http://localhost:3000/api/v1/users";
const fetchHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

//// ----------  EVENT LISTENERS  ---------- ////
// Login Submit
loginForm.addEventListener('submit', (ev) => login(ev));
// Event Listener for clicking outside show photo div
document.addEventListener('click', (ev) => {
  if (ev.target.classList[0] === "overlay") {
    hidePhotoPage();
  }
})
// Add photo Form Submit
newPhoto.addEventListener('submit', (ev) => createPhoto(ev));

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

// Shows Photo page overlay
function showPhotoPage(ev, photo) {
  // Display view
  photoPage.style.display = "block";
  // Clearing page
  while (photoPage.firstChild) {
    photoPage.firstChild.remove();
  }
  // Creating main <div class="photo-card">
  let photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');
  // Creating <img>
  let img = document.createElement('img');
  img.src = photo.photo_source;
  // Create wrapper for text
  let wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  // Creating <div>Caption
  let caption = document.createElement('div');
  caption.id = 'caption';
  caption.textContent = `Caption: ${photo.caption}`;
  //Creating <div>Photographer
  let photographer = document.createElement('div');
  photographer.id = 'photographer';
  photographer.textContent = `Photo by: ${photo.user.name}`;
  // Putting it altogether
  wrapper.append(caption, photographer);
  photoCard.append(img, wrapper);
  photoPage.appendChild(photoCard);
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


// Display photo
function displayPhoto(photo) {
  let galleryCard = document.createElement('div');
  galleryCard.classList.add('gallery-card');
  let img = document.createElement('img');
  img.src = photo.photo_source;
  galleryCard.appendChild(img);
  galleryCard.addEventListener('click', (ev) => showPhotoPage(ev, photo))
  allPhotos.appendChild(galleryCard);
}


// Create a new Photo
function createPhoto(ev) {
  ev.preventDefault();
  let caption = ev.target[0].value;
  let user = ev.target[1].value;
  let photo_source = ev.target[2].value;
  const bodyJSON = { caption, user, photo_source };
  fetch(PHOTOS_URL, {
    method: 'POST',
    headers: fetchHeaders,
    body: JSON.stringify({photo: bodyJSON})
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}


// Login function
function login(ev) {
  ev.preventDefault();
  let name = ev.target[0].value;
  fetch(USERS_URL, {
    method: 'POST',
    headers: fetchHeaders,
    body: JSON.stringify({name: name})
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
  })
  hideLoginPage();
}

// Initialize with Login page
showLoginPage();
fetchPhotos();
