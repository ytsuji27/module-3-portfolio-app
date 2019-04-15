###### USERS ######
user1 = User.create(
  name: "Yutaro"
)

###### PHOTOS ######
photo1 = Photo.create(
  caption: "Baby Pineapple",
  user: user1
)
photo1.photo_source.attach(io: File.open("app/assets/photos/IMG_7060.jpg"), filename: "IMG_7060.jpg")

photo2 = Photo.create(
  caption: "Plumeria",
  user: user1
)
photo2.photo_source.attach(io: File.open("app/assets/photos/IMG_0827.jpg"), filename: "IMG_0827.jpg")

photo3 = Photo.create(
  caption: "Pineapple Flower",
  user: user1
)
photo3.photo_source.attach(io: File.open("app/assets/photos/IMG_7071.jpg"), filename: "IMG_7071.jpg")
