class Api::V1::LikesController < ApplicationController
  include ActionController::Serialization

  def index
    @likes = Like.all
    render json: @likes
  end

  def create
    user = User.find_by(name: params[:user][:name])
    photo = Photo.find(params[:photo_id])
    @like = Like.create!({user: user, photo: photo})
    @like.save
    render json: @like, status: 201
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    render "Deleted Successfully", status: 204 
  end

end
