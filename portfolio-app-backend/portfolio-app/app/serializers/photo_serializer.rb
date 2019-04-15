class PhotoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  default_url_options[:host] = 'localhost:3000'
  attributes :id, :caption, :user, :photo_source

  def photo_source
    url_for(object.photo_source) if object.photo_source.attached?
  end

end
