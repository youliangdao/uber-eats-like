Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :restaurants do
        resources :foods, only: %i[index]
      end
      resources :line_foods, only: %i[index create]
      put 'line_foods/replace', to: 'line_foods#replace'
      resources :orders, only: %i[create]
    end
  end
  post '/signup', to: 'registrations#signup'

  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
  get '/logged_in', to: 'sessions#logged_in?'
end
