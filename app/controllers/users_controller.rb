class UsersController < ApplicationController
  respond_to :html, :json, :xml

  def create
    user = User.create(params[:user])
    cookies.permanent[:token] = user.token if user.valid?
    respond_with user
  end
  
  def update
    @user = User.find_by_id(params[:user_id])
    # @user = current_user
    # if @user.update_attributes(params[:user])
    #   cookies.permanent[:token] = @user.token
    #   session[:user_id] = @user.id
    #   current_user = @user
    # end
    respond_with @user.update_attributes(params[:user])
  end
  
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
