class Admin::ZoningDistrictsController < ApplicationController
  layout 'admin'
  can_edit_on_the_spot
  
  def index
    @zoning_districts = ZoningDistrict.all(:order => :code)
  end
  
  def show
    @zoning_district = ZoningDistrict.find(params[:id])
    @cic_code_zoning_districts = @zoning_district.cic_code_zoning_districts.sorted_by_cic_code.paginate(
      :page => params[:page])
  end
  
  def edit
    @zoning_district = ZoningDistrict.find(params[:id])
  end

  def update
    @zoning_district = ZoningDistrict.find(params[:id])
    
    respond_to do |format|
      if @zoning_district.update_attributes(params[:zoning_district])
        format.html { redirect_to admin_zoning_districts_url, notice: 'Zoning District was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end
  
  def new
    
  end
  
  def create
    
  end
  
  def destroy
    @zoning_district = ZoningDistrict.find(params[:id])
    @zoning_district.destroy
    
    respond_to do |format|
      format.html { redirect_to admin_zoning_districts_url }
    end
  end
end
