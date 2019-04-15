class Api::V1::PhotosController < ApplicationController
  include ActionController::Serialization

  before_action :set_photo, only: [:update, :destroy]

  def index
    @photos = Photo.all.with_attached_photo_source
    render json: @photos
  end

  def create
    user = User.find_by(name: params[:photo][:user]) || User.create(name: params[:photo][:user])
    byebug
    @photo = Photo.create!({user: user})
    @photo.caption = params[:photo][:caption]
    @photo.photo_source.attach(params[:photo][:photo_source])
    byebug
    render json: @photo, status: 201
  end

  def update
  end

  def destroy
  end

  private

  def photo_params
    params.permit(:caption, :user, :photo_source)
  end

  def set_photo
    @photo = Photo.find(params[:id])
  end

end
