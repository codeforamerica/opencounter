class SessionsController < ApplicationController
  respond_to :html, :json
  
  def destroy
    session[:user_id] = nil
    cookies[:token] = nil
    redirect_to root_path
  end

  def current_user
    if user=User.find_by_token(cookies[:token])
      respond_with user.as_json(only: ['first_name', 'last_name'])
    end
  end
end
