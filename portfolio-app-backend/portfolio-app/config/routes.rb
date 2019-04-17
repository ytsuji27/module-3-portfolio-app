Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :photos, only: [:index, :create, :update]
      resources :users, only: [:index, :create]
      resources :comments, only: [:index, :create]
      resources :likes, only: [:index, :create, :destroy]
    end
  end
end
