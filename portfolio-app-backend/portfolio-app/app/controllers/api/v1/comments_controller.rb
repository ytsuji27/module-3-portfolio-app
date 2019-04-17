class Api::V1::CommentsController < ApplicationController
  include ActionController::Serialization

  def index
    @comments = Comment.all
    render json: @comments
  end

  def create
    user = User.find_by(name: params[:user][:name]) || User.create(name: params[:user][:name])
    @comment = Comment.create({
      user: user,
      content: params[:content],
      photo_id: params[:photo_id]
    })
    render json: @comment, status: 201
  end


end
