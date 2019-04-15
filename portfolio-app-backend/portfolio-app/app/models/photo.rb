class Photo < ApplicationRecord

  has_many :comments
  has_many :likes
  has_many :commenters, through: :comments, class_name: "User", foreign_key: "commenter_id"
  has_many :likers, through: :likes, class_name: "User", foreign_key: "liker_id"
  belongs_to :user
  has_one_attached :photo_source

end
