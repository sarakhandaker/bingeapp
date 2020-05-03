Rails.application.routes.draw do
  resources :user_shows
  resources :user_episodes
  resources :shows
  resources :users
  resources :episodes
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
