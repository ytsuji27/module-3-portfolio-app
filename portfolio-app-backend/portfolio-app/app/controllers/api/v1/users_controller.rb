class Api::V1::UsersController < ApplicationController
  # before_action :set_photo, only: [:update, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.find_by(name: params[:name]) || User.create(name: params[:name])
    render json: @user, status: 201
  end

end
