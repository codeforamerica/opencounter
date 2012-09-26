class Admin::CicCodeZoningDistrictsController < ApplicationController
  layout 'admin'
  
  def show
    @cic_code_zoning_district = CicCodeZoningDistrict.find(params[:id])
  end
  
  def edit
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

  def update
    @cic_code_zoning_district = CicCodeZoningDistrict.find(params[:id])
    
    respond_to do |format|
      if @cic_code_zoning_district.update_attributes(params[:cic_code_zoning_district])
        format.html { redirect_to admin_zoning_districts_url, notice: 'Page was successfully updated.' }
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
