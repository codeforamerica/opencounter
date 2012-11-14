class Admin::ApplicationsController < ApplicationController
  layout 'admin'
  
  def index
    @applications = Business.all
  end

  def show
    @application = Business.find_by_id(params[:id])
    @user = @application.user
  end
  
end
