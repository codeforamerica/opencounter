class CicCodeZoningDistrict < ActiveRecord::Base
  belongs_to :cic_code
  belongs_to :zoning_district
  attr_accessible :cic_code_id, :home_occ_prohibited, :notes, :permission, :zoning_district_id
  
  def self.cross_reference(cic_code_id, zoning_district_id)
    self.where(cic_code_id: cic_code_id, zoning_district_id: zoning_district_id).try(:first)
  end

  # Maps the integer permission field to a more human-readable string name
  def permission_name
    case permission
      when 1 then "Zoning Clearance"
      when 2 then "AUP"
      when 3 then "SUP"
      when 4 then "Prohibited"
      else "Unknown"
    end
  end

  def home_occ_prohibited_name
    home_occ_prohibited ? "Yes" : "No"
  end

end
