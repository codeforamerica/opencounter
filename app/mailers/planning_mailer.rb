class PlanningMailer < ActionMailer::Base
  default from: "planningcounter@opencounter.org"

  def deliver_submission_email(user)
    @user = user
    mail(:to => "planningcounter@cityofsantacruz.com", :subject => "[OpenCounter] New Business Inquiry")
  end

end
