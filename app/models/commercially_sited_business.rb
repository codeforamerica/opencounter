class CommerciallySitedBusiness < ActiveRecord::Base
  belongs_to :business_id
  attr_accessible :apn, :area_sqft_first_floor, :area_sqft_outdoor, :area_sqft_total, :bicycle_parking_spaces, :car_parking_spaces, :intended_use, :is_single_tenant, :prior_use, :zoning_district
end
