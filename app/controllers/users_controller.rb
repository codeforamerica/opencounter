class UsersController < InheritedResources::Base
  respond_to :html, :json, :xml

  def create
    create! do |success, failure|
      if success
        session[:user_id] = @user.id
      end
    end
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
