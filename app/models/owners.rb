class Owners < ActiveRecord::Base
  belongs_to :business_id
  attr_accessible :first_name, :last_name, :physical_address_city, :physical_address_detail, :physical_address_state, :physical_address_street, :physical_address_zip, :position
end
