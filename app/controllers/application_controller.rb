class ApplicationController < ActionController::Base
  protect_from_forgery
  layout :layout_by_resource
  
  private

  # Can possibly cut down on code complexity by creating a temp user here if no current_user is present
  def current_user
    User.find_by_token(cookies[:token])
  end
  helper_method :current_user

  def after_sign_in_path_for(resource_or_scope)
    admin_applications_url
  end
  
  def after_sign_out_path_for(resource_or_scope)
    root_url
  end
  
  def layout_by_resource
    if devise_controller?
      "admin"
    else
      "application"
    end
  end
end
