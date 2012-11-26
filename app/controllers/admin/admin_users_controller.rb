class Admin::AdminUsersController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!
  
  def index
    @admin_users = AdminUser.all
  end
  
  def edit
    @admin_user = AdminUser.find(params[:id])
  end
  
  def update
    @admin_user = AdminUser.find(params[:id])
    respond_to do |format|
      if @admin_user.update_attributes(params[:admin_user])
        format.html { redirect_to admin_admin_users_url, notice: 'User was successfully updated'  }
      else
        format.html { render action: "edit" }
      end
    end
  end
  
  def new
    @admin_user = AdminUser.new
  end
  
  def create
    @admin_user = AdminUser.new(params[:admin_user])
    
    respond_to do |format|
      if @admin_user.save
        format.html { redirect_to admin_admin_users_url, notice: 'User was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end
  
  def destroy
    @admin_user = AdminUser.find(params[:id])
    @admin_user.destroy
    
    respond_to do |format|
      format.html { redirect_to admin_admin_users_url }
    end
  end
end
