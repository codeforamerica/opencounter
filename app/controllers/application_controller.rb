class ApplicationController < ActionController::Base
  protect_from_forgery
  layout :layout_by_resource

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user
  
  def after_sign_in_path_for(resource_or_scope)
    admin_zoning_districts_path
  end
  
  def after_sign_out_path_for(resource_or_scope)
    root_url
  end
  
  def auth_user!
    redirect_to new_admin_user_session_path unless admin_user_signed_in?
  end
  
  def layout_by_resource
    if devise_controller?
      "admin"
    else
      "application"
    end
  end
end
