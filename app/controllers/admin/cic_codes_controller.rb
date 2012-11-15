class Admin::CicCodesController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!
  can_edit_on_the_spot

  def index
    @cic_codes = CicCode.all
  end
  
  def new
    @cic_code = CicCode.new(params[:cic_code])
  end
  
  def create
    @cic_code = CicCode.new(params[:cic_code])
    
    respond_to do |format|
      if @cic_code.save
        format.html { redirect_to admin_cic_codes_url, notice: 'CIC Code was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end
  
  def edit
    @cic_code = CicCode.find(params[:id])
    @requirements = Requirement.all(:order => 'jurisdiction, name')
  end

  def update
    params[:cic_code][:requirement_ids] ||= []
    @cic_code = CicCode.find(params[:id])
    @requirements = Requirement.all(:order => 'jurisdiction, name')
    
    respond_to do |format|
      if @cic_code.update_attributes(params[:cic_code])
        format.html { redirect_to admin_cic_codes_url, notice: 'CIC Code was successfully updated.' }          
      else
        format.html { render action: "edit" }
      end
    end
  end
  
  def destroy
    @cic_code = CicCode.find(params[:id])
    @cic_code.destroy
    
    respond_to do |format|
      format.html { redirect_to admin_cic_codes_url }
    end
  end
end
