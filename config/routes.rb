Rails.application.routes.draw do
  resources :book
  get 'auth', to: 'session#check'
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end