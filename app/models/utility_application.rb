class UtilityApplication < ActiveRecord::Base
  attr_accessible :previous_street,
                  :previous_detail,
                  :previous_state,
                  :previous_zip,
                  :previous_city,
                  :fax,
                  :business_license_number,
                  :business_license_expiry_date,
                  :service_start_date,
                  :container,
                  :has_multiple_pickups

  
  validates_format_of :fax, 
                      :message => "must be a valid fax number.", 
                      :with => /^[\(\)0-9\- \+\.]{10,20}$/i
end
