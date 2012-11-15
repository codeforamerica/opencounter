class Admin::RequirementsController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!
  
  def index
    @requirements = Requirement.all(:order => 'jurisdiction, name')
  end
  
  def edit
    @requirement = Requirement.find(params[:id])
  end
  
  def update
    @requirement = Requirement.find(params[:id])
    respond_to do |format|
      if @requirement.update_attributes(params[:requirement])
        format.html { redirect_to admin_requirements_url, notice: 'Requirement was successfully updated'  }
      else
        format.html { render action: "edit" }
      end
    end
  end
  
  def new
    @requirement = Requirement.new
  end
  
  def create
    @requirement = Requirement.new(params[:requirement])
    
    respond_to do |format|
      if @requirement.save
        format.html { redirect_to admin_requirements_url, notice: 'Requirement was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end
  
  def destroy
    @requirement = Requirement.find(params[:id])
    @requirement.destroy
    
    respond_to do |format|
      format.html { redirect_to admin_requirements_url }
    end
  end
end
