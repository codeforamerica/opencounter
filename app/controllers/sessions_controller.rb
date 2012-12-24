class SessionsController < ApplicationController
  respond_to :html, :json

  # login
  def create
    email, password = params[:email], params[:password]

    user = User.find_by_email( email )
    if user.try(:authenticate, password)

      # TODO: put this somewhere more appropriate.  Something like an
      #       authentication callback (Devise does this?).
      #       --hale
      if current_user.try(:account_type) == "temp"
        user.assign_business Business.find_by_token(current_user.current_business.token)
      end

      current_user.try(:destroy)
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
        "current_business" => { 
          "name" => user.current_business.business_name,
          "token" => user.current_business.token 
        }
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
