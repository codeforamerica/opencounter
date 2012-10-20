class CicCodeZoningDistrict < ActiveRecord::Base
  belongs_to :cic_code
  belongs_to :zoning_district
  attr_accessible :cic_code_id, :home_occ_prohibited, :notes, :permission, :zoning_district_id
  
  def self.cross_reference(cic_code_id, zoning_district_id)
    self.where(cic_code_id: cic_code_id, zoning_district_id: zoning_district_id).try(:first)
  end
  
  def permission_name
    return permission
  end
end
