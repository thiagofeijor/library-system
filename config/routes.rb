Rails.application.routes.draw do
  resources :book
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end