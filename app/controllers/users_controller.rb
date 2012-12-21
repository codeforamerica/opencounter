class UsersController < ApplicationController
  respond_to :html, :json, :xml

  def create
    user = User.new(params[:user])
    # hack to bypass authentication requirements
    if params[:user][:account_type] == "temp"
      pass = SecureRandom.hex(10)
      user.password = pass
      user.password_confirmation = pass
      user.email = "#{pass}@notarealemail.com"
    end
    user.save
    cookies.permanent[:token] = user.token
    respond_with user
  end
  
  # this will get
  def update
    @user = User.find_by_id(params[:user_id])
    #   cookies.permanent[:token] = @user.token
    respond_with @user.update_attributes(params[:user])
  end

  # def new_business
  #   # the perm user we want to attach the business to
  #   @user = User.find_by_token(params[:token])

  #   # the temp user who currently has the business

  #   @user.businesses.create(params[:business])
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
end
