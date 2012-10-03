class Admin::CicCodesController < ApplicationController
  layout 'admin'
  
  def show
    @cic_code = CicCode.find(params[:id])
  end

  def index
    @cic_codes = CicCode.all
  end
  
  def new
    @cic_code = CicCode.new(params[:cic_code])
    @zoning_district_id = params[:zoning_district_id]
  end
  
  def create
    @cic_code = CicCode.new(params[:cic_code])
    
    respond_to do |format|
      if @cic_code.save
        format.html { redirect_to admin_zoning_districts_url, notice: 'CIC Code was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end
  
  def edit
    @cic_code = CicCode.find(params[:id])
    @zoning_district = ZoningDistrict.find(params[:zoning_district_id])
  end

  def update
    @cic_code = CicCode.find(params[:id])
    @zoning_district = ZoningDistrict.find(params[:zoning_district_id])
    
    respond_to do |format|
      if @cic_code.update_attributes(params[:cic_code])
        format.html { redirect_to admin_zoning_district_url(@zoning_district), notice: 'CIC Code was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end
  
  def destroy
    @cic_code = CicCode.find(params[:id])
    @cic_code.destroy
    
    respond_to do |format|
      format.html { redirect_to admin_zoning_districts_url }
    end
  end
end
