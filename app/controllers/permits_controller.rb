class PermitsController < ApplicationController

  PERMITS = CSV.read(Rails.root + 'app/assets/csv/zoning_districts_and_sic_codes.csv', :headers => true)
  PERMITS_MAP = PERMITS.map{ |row| Hash[row] }
  PERMITS_HASH = PERMITS_MAP.reduce(Hash.new(0)) do |set,item| 
    set[item.delete("zoning district")] = item
    set
  end

  def show
    sic = params["sic"]
    permit = params["zoning"]
    
    zoning_lookup = PERMITS_HASH[permit]
    result = nil

    zoning_lookup.each do |zoning_type, sics|
      if sics.split(",").include?(sic)
        result = zoning_type
      end
    end

    result ||= "unknown"

    render :json => {"permit" => result }
  end
  

end
