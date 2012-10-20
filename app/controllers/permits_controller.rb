class PermitsController < ApplicationController

  def show
    
    cic_code_id = CicCode.find_by_code(params['sic'])
    
    zoning_district_id = ZoningDistrict.find_by_code(params['zoning'])
    
    permissions = CicCodeZoningDistrict.find_by_cic_code_id_and_zoning_district_id(cic_code_id, zoning_district_id)
    
    # 1 = zoning clearance, 2 = aup, 3 = sup, 4 = prohibited, 5 = unknown
    permit = permissions.permission
    
    # true/false
    home_occ_prohibited = permissions.home_occ_prohibited
    
    # null or string
    notes = permissions.notes
    
    render :json => {"permit" => permit, "home_occ_prohibited" => home_occ_prohibited, "notes" => notes }

  end
  

end
