class Owner < User
  attr_accessible :position #seems much like role in super
  attr_accessible :physical_address_city,
                  :physical_address_detail,
                  :physical_address_zip,
                  :physical_address_street,
                  :physical_address_state,
                  :drivers_license_number,
                  :has_owned_eed_business,
                  :eed_account,
                  :eed_business_name,
                  :eed_detail,
                  :eed_street,
                  :eed_state,
                  :eed_city,
                  :eed_zip

  validates_presence_of :position,
                        :physical_address_state,
                        :physical_address_street,
                        :physical_address_zip,
                        :physical_address_detail,
                        :physical_address_city,
                        :drivers_license_number,
                        :has_owned_eed_business


  #TODO validate format for address

end
