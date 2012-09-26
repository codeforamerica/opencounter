class CicCodeZoningDistrict < ActiveRecord::Base
  belongs_to :cic_code
  belongs_to :zoning_district
  attr_accessible :cic_code_id, :home_occ_prohibited, :notes, :permitted, :permitted_aup, :permitted_sup, :prohibited, :unknown, :zoning_district_id
  
  def self.cross_reference(cic_code_id, zoning_district_id)
    self.where(cic_code_id: cic_code_id, zoning_district_id: zoning_district_id).try(:first)
  end
  
  def permission_name
    if permission == 1
      return "Permitted"
    elsif permission == 2
      return "Administrative Use Permit Required"
    elsif permission == 3
      return "Special Use Permit Required"
    elsif permission == 4
      return "Prohibited"
    elsif permission == 5
      return "Unknown"
    end
  end
end
