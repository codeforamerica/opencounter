class PlanningMailer < ActionMailer::Base
  default from: "planningcounter@opencounter.org"

  def submission_email(user)
    @user = user
    to_address = Rails.application.config.PLANNING_DEPARTMENT_EMAIL
    mail(:to => to_address, :subject => "[OpenCounter] New Business Inquiry")
  end

end
