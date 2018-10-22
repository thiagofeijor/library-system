Rails.application.routes.draw do
  resources :book
  get 'auth', to: 'session#session'
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end