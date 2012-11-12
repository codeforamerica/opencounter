class Admin::ApplicationsController < ApplicationController
  layout 'admin'

  def index
    # An application is defined as the collection of answers for a given user.
    #@applications = User.all(&:answers)
  end

end
