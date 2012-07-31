class Owner < User
  attr_accessible :position #seems much like role in super
  attr_accessible :physical_address_city,
                  :physical_address_detail,
                  :physical_address_zip,
                  :physical_address_street,
                  :physical_address_state

  validates_presence_of :position,
                        :physical_address_state,
                        :physical_address_street,
                        :physical_address_zip,
                        :physical_address_detail,
                        :physical_address_city

  #TODO validate format for address

end
