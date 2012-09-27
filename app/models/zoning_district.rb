class ZoningDistrict < ActiveRecord::Base
  has_many :cic_code_zoning_districts, :dependent => :destroy
  has_many :cic_codes, :through => :cic_code_zoning_districts, :dependent => :destroy, :order => "code ASC"
  attr_accessible :code, :description, :home_occ_prohibited, :name
  after_create :create_zoning_district_connections
    
  def permission_name(cic_code_id)
    CicCodeZoningDistrict.cross_reference(cic_code_id, self.id).try(:permission_name)    
  end

  def active_cic_codes
    self.cic_codes.where('permission IN (?)', [1,2,3,4])
  end
  
  private
  
  def create_zoning_district_connections
    CicCode.all.each do |cic_code|
      CicCodeZoningDistrict.find_or_create_by_cic_code_id_and_zoning_district_id(cic_code.id, self.id)
    end
  end
end
