class PermitsController < ApplicationController

  # PERMITS = CSV.read(Rails.root + 'app/assets/csv/zoning_districts_and_sic_codes.csv', :headers => true)
  # PERMITS_MAP = PERMITS.map{ |row| Hash[row] }
  # PERMITS_HASH = PERMITS_MAP.reduce(Hash.new(0)) do |set,item| 
  #   set[item.delete("zoning district")] = item
  #   set
  # end

  # Given a CIC code and a Zoning district, return which permits are required 
  # (use the integer 'permissions' column of CicCodes_and_zoning_districts)
  # def show
  #   # e.g. 
  #   sic = params["sic"]

  #   # e.g. "R-C"
  #   permit = params["zoning"]
    
  #   zoning_lookup = PERMITS_HASH[permit]
  #   result = nil

  #   if zoning_lookup != 0
  #     # zoning_type can be: ["zoning clearance", "administrative", "special", "prohibited", "unknown"]
  #     # sics is a range of SIC codes, eg: "800A,800B"
  #     zoning_lookup.each do |zoning_type, sics|
  #       if sics.nil?
  #         sics = ""
  #       end
  #       sics_split = sics.split(",")
  #       sics_split.each do |sic_symbol|
  #         if sic_symbol =~ /-/
  #           range_start, range_end = sic_symbol.split("-")
  #           if (range_start.to_i..range_end.to_i).include?(sic.to_i)
  #             result = zoning_type
  #             break
  #           end
  #         else
  #           if sic_symbol == sic
  #             result = zoning_type
  #             break
  #           end
  #         end
  #       end
  #     end
  #   end
  #   result ||= "unknown"

  #   render :json => {"permit" => result }
  # end

  def show
    cic_code_id = CicCode.find_by_code(params['sic'])
    zoning_district_id = ZoningDistrict.find_by_code(params['zoning'])
    permission_number = 
      CicCodeZoningDistrict.find_by_cic_code_id_and_zoning_district_id(
        cic_code_id, zoning_district_id).permission

    result = "unknown"
    case permission_number
    when 1
      result = "zoning clearance"
    when 2
      result = 'administrative'
    when 3
      resilt = 'special'
    when 4
      result = 'prohibited'
    when 5
      result = 'unknown'
    end

    render :json => {"permit" => result }

  end
  

end
