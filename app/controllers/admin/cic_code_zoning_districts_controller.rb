class Admin::CicCodeZoningDistrictsController < ApplicationController
  layout 'admin'
  can_edit_on_the_spot
  
  def show
    @cic_code_zoning_district = CicCodeZoningDistrict.find(params[:id])
  end
  
  def new
    @cic_code_zoning_district = CicCodeZoningDistrict.find(params[:id])
  end
  
  def create
    @cic_code_zoning_district = CicCodeZoningDistrict.new(params[:cic_code_zoning_district])
    
    respond_to do |format|
      if @cic_code_zoning_district.save
        format.html { redirect_to admin_zoning_districts_url, notice: 'CIC Code was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end
  
  def edit
    @cic_code_zoning_district = CicCodeZoningDistrict.find(params[:id])
  end

  def update
    @cic_code_zoning_district = CicCodeZoningDistrict.find(params[:id])
    @zoning_district = ZoningDistrict.find(params[:zoning_district_id])
    
    respond_to do |format|
      if @cic_code_zoning_district.update_attributes(params[:cic_code_zoning_district])
        format.html { redirect_to admin_zoning_district_url(@zoning_district), notice: 'Permissions were successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end
  
  def destroy
    @cic_code_zoning_district = CicCodeZoningDistrict.find(params[:id])
    @cic_code_zoning_district.destroy
    
    respond_to do |format|
      format.html { redirect_to admin_zoning_districts_url }
    end
  end
end
