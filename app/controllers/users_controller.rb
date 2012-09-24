class UsersController < ActionController::Base
  respond_to :html, :json, :xml

  def create
    @user = User.find_or_initialize_by_email(params[:user][:email])
    if @user.update_attributes(params[:user])
      session[:user_id] = @user.id
      @current_user = @user
      @user.businesses << Business.create()
    end
    respond_with @user
  end
  
  def update_planning
    user = User.where(:email => params[:email]).first
    if user
      PlanningMailer.delay.deliver_submission_email(current_user)
      render :json => { :status => "sent" }
    else
      render :json => { :status => "error" }
    end
  end
end
