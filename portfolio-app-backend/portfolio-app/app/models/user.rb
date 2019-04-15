class User < ApplicationRecord

  has_many :comments
  has_many :likes
  has_many :photos
  has_many :photos, through: :comments
  has_many :photos, through: :likes

end
