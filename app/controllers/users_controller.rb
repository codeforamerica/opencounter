class UsersController < ApplicationController
  respond_to :html, :json, :xml

  def create
    user = User.new(user_params)

    # hack to bypass authentication requirements
    if params[:user][:account_type] == "temp"
      pass = SecureRandom.hex(10)
      user.password = pass
      user.password_confirmation = pass
      mail = SecureRandom.hex(10)
      user.email = "#{mail}@notarealemail.com"
    end

    user.save

    # inherit answers from temp account
    if (user.valid? && (user.account_type == "perm") && (current_user.try(:account_type) == "temp"))
      user.assign_business(current_user.current_business)
      current_user.destroy
    end

    # login (temp accounts always valid)
    if user.valid? || (params[:user][:account_type] == "temp")
      cookies.permanent[:token] = user.token 
    end

    respond_with user
  end
  
  def add_business
    @user = User.find_by_token(params[:user_token])
    @user.add_business()
    respond_with @user
  end

  # def update
  #   @user = User.find_by_id(params[:user_id])
  #   #   cookies.permanent[:token] = @user.token
  #   respond_with @user.update_attributes(params[:user])
  # end
  
  def application_email
    if current_user && PlanningMailer.application_email(current_user).deliver
      render :json => { :status => "sent" }
    else
      render :json => { :status => "error" }
    end
  end
  
  def help_email
    if PlanningMailer.help_email(params, current_user).deliver
      render :json => { :status => "sent" }
    else
      render :json => { :status => 'error' }
    end
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :phone, :role,
                  :last_state, :token, :created_at, :id, :updated_at,
                  :remember_token, :password, :password_confirmation,
                  :account_type, :current_business_token, :authenticity_token)
  end
end
