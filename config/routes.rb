Opencounter::Application.routes.draw do
  root :to => 'panels#intro'

  devise_for :admin_users

  match "api/email/application" => "users#application_email", :via => [:get]
  match "api/email/help" => "users#help_email", :via => [:get]
  match "api/lookup/cic" => "cic_codes#index", :via => [:get]
  match "api/lookup/permit/:zoning/:sic" => "permits#show", :via => [:get]
  match "api/lookup/requirements" => "requirements#index", :via => [:get]
  match '/admin/' => redirect('/admin/applications#index'), :via => [:get]
  match '/help' => 'panels#intro', :via => [:get]

  resources :users, :except => :index
  resources :answers
  # resources :businesses

  match '/sessions/create'  => 'sessions#create', :via => [:get, :post]
  match '/sessions/show'    => "sessions#show", :via => [:get]
  match '/sessions/destroy' => "sessions#destroy", :via => [:get]

  match '/users/add_business' => 'users#add_business', :via => [:get]
    
  namespace :admin do
    
    resources :admin_users
    resources :cic_codes do
      collection do
        put :update_attribute_on_the_spot
        get :get_attribute_on_the_spot
      end
    end
    resources :requirements do
      post :sort, on: :collection
    end
    
    resources :cic_code_zoning_districts do
      collection do
        put :update_attribute_on_the_spot
        get :get_attribute_on_the_spot
      end
    end
    resources :zoning_districts do
      collection do
        put :update_attribute_on_the_spot
        get :get_attribute_on_the_spot
      end
    end
    resources :applications
  end

  get "/about"              => "panels#about" 
  get "/help"               => "panels#help"
  get "/info"               => "panels#info"
  get "/info/*path"          => "panels#info"
  get "/intro"              => "panels#intro"
  get "/intro/*path"         => "panels#intro"
  get "/location"           => "panels#location"
  get "/location/*path"      => "panels#location"
  get "/requirements"       => "panels#requirements"
  get "/requirements/*path"  => "panels#requirements"
  get "/summary"            => "panels#summary"
  get "/welcome"            => "panels#welcome"
 
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
