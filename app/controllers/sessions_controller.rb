class SessionsController < ApplicationController
  respond_to :html, :json

  # login
  def create
    email, password = params[:email], params[:password]

    user = User.find_by_email( email )
    if user.try(:authenticate, password)
      cookies.permanent[:token] = user.token
      respond_with user, location: nil
    else
      respond_with({}, location: nil, status: :unauthorized)
    end
  end

  # current user
  def show
    if (user=User.find_by_token(cookies[:token]))
      respond_with user.as_json(only: ['first_name', 'last_name', 'token', 'email', 'account_type']).merge( 
        "full_name" => user.full_name,
        "current_business" => { "name" => user.current_business.business_name }
        )
    else
      respond_with {}
    end
  end

  # logout
  def destroy
    session[:user_id] = nil
    cookies[:token] = nil
    respond_with 'success'
  end

end
