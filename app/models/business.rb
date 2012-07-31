class Business < ActiveRecord::Base
  attr_accessible :description, :is_home_occ, :is_sole_owner, :mailing_address_city, :mailing_address_detail, :mailing_address_state, :mailing_address_street, :mailing_address_zip, :name, :phone, :physical_address_city, :physical_address_detail, :physical_address_state, :physical_address_street, :physical_address_zip, :structure, :type
end
