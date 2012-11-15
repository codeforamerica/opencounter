class Admin::ApplicationsController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!

  def index
    @applications = Business.all
  end

  def show
    @application = Business.find_by_id(params[:id])
    @user = @application.user
  end
  
end

