class PlanningMailer < ActionMailer::Base
  default from: "submission@opencounter.org"

  def deliver_submission_email(user)
    @user = user
    mail(:to => "planning@cityofsantacruz.com", :subject => "OpenCounter submission")
  end

end
