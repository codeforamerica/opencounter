class PlanningMailer < ActionMailer::Base
  default from: "planningcounter@opencounter.org"
  
  #NOTE: the view currently uses @user.answers, perhaps it should use Business ?
  def submission_email(user)
    @user = user

    @user.businesses.order("created_at DESC").first.mark_submitted
    
    to_address = Rails.application.config.PLANNING_DEPARTMENT_EMAIL
    mail(:to => to_address, :subject => "OpenCounter New Business Inquiry")
  end
  
  def help_email(params, user)
    @params = params
    @user = user
    to_address = Rails.application.config.PLANNING_DEPARTMENT_EMAIL
    mail(:to => to_address, :subject => "OpenCounter Help Request")
  end

end
