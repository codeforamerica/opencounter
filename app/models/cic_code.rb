class CicCode < ActiveRecord::Base
  has_many :cic_code_zoning_districts, :dependent => :destroy
  has_many :zoning_districts, :through => :cic_code_zoning_districts, :dependent => :destroy, :order => "code ASC"
  attr_accessible :code, :industry, :subindustry, :home_occ_prohibited, :keywords, :parent_id
  after_create :create_zoning_district_connections
  
  def permission_name(zoning_district_id)
    CicCodeZoningDistrict.cross_reference(self.id, zoning_district_id).try(:permission_name)    
  end
  
  private
  
  def create_zoning_district_connections
    ZoningDistrict.all.each do |zoning_district|
      CicCodeZoningDistrict.find_or_create_by_cic_code_id_and_zoning_district_id(self.id, zoning_district.id)
    end
  end
end
