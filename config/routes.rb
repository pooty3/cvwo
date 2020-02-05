Rails.application.routes.draw do
  get 'welcome/index'
namespace :api do
	namespace :v1 do
  		resources :tasks, :tags do
  			resources :taggings
  		end
  		resources :taggings, only: [:index,:destroy]
  	end
  end


  root 'welcome#index'
  get '*path', to: 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
