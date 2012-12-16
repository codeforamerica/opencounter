Opencounter::Application.routes.draw do
  root :to => 'panels#intro'

  devise_for :admin_users

  match "api/email/application" => "users#application_email"
  match "api/email/help" => "users#help_email"
  match "api/lookup/cic" => "cic_codes#index"
  match "api/lookup/permit/:zoning/:sic" => "permits#show"
  match "api/lookup/requirements" => "requirements#index"
  match '/admin/' => redirect('/admin/applications#index')

  resources :users, :except => :index
  resources :answers
  resources :businesses

  match '/session/current_user' => 'sessions#current_user'
    
  namespace :admin do
    
    resources :admin_users
    resources :cic_codes do
      collection do
        put :update_attribute_on_the_spot
        get :get_attribute_on_the_spot
      end
    end
    resources :requirements
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

  match "/about"              => "panels#about"  
  match "/help"               => "panels#help"  
  match "/info"               => "panels#info"
  match "/info*path"          => "panels#info"
  match "/intro"              => "panels#intro"
  match "/intro*path"         => "panels#intro"
  match "/location"           => "panels#location"
  match "/location*path"      => "panels#location"
  match "/requirements"       => "panels#requirements"
  match "/requirements*path"  => "panels#requirements"
  match "/summary"            => "panels#summary"
  match "/welcome"            => "panels#welcome"
 
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
