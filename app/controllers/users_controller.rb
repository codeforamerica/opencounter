class UsersController < ApplicationController
  respond_to :html, :json, :xml

  def create
    @user = User.find_or_initialize_by_email(params[:user][:email])
    if @user.update_attributes(params[:user])

      #sign in the new user
      cookies.permanent[:remember_token] = @user.remember_token
      current_user = @user

      @user.businesses << Business.create()
    end
    session[:user_id] = @user.id
    respond_with @user
  end
  
  def update_planning
    Rails.logger.debug "Updating planning: Current user: #{current_user}"
    if current_user
      PlanningMailer.submission_email(current_user).deliver
      render :json => { :status => "sent" }
    else
      render :json => { :status => "error" }
    end
  end
  
  def planning_help
    PlanningMailer.help_email(params, current_user).deliver
    render :json => { :status => "sent" }    
  end
end
