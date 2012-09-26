class Admin::ZoningDistrictsController < ApplicationController
  layout 'admin'
  
  def index
    @zoning_districts = ZoningDistrict.all(:order => :code)
  end
  
  def show
    @zoning_district = ZoningDistrict.find(params[:id])
    @cic_code_zoning_districts = @zoning_district.cic_code_zoning_districts.sort_by {|x| x.cic_code.code}  
  end
  
  def edit
    @zoning_district = ZoningDistrict.find(params[:id])
    @cic_code_zoning_districts = @zoning_district.cic_code_zoning_districts.sort_by {|x| x.cic_code.code}
  end
  
  def update
    @zoning_district = ZoningDistrict.find(params[:id])
  end
  
  def new
    
  end
  
  def create
    
  end
  
  def destroy
    @zoning_district = ZoningDistrict.find(params[:id])
  end
end
