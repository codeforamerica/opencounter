class Business < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_one :naics, :utility_application, :use_permit, :environmental_health_permit, :sec_state_registration, :payroll_tax, :irs_ein_application
  attr_accessible :description, 
                  :is_home_occ, 
                  :is_sole_owner, 
                  :mailing_address_city, 
                  :mailing_address_detail, 
                  :mailing_address_state, 
                  :mailing_address_street, 
                  :mailing_address_zip, 
                  :name, 
                  :phone, 
                  :physical_address_city, 
                  :physical_address_detail, 
                  :physical_address_state, 
                  :physical_address_street, 
                  :physical_address_zip, 
                  :structure 
  #:type I assume this is covered by the naics code
  
  validates_presence_of :description,
                        :is_home_occ, 
                        :is_sole_owner, 
                        :mailing_address_city, 
                        :mailing_address_detail, 
                        :mailing_address_state, 
                        :mailing_address_street, 
                        :mailing_address_zip, 
                        :name, 
                        :phone, 
                        :physical_address_city, 
                        :physical_address_detail, 
                        :physical_address_state, 
                        :physical_address_street, 
                        :physical_address_zip, 
                        :structure 

  validates_format_of :phone, 
                      :message => "must be a valid telephone number.", 
                      :with => /^[\(\)0-9\- \+\.]{10,20}$/i
  #TODO Address validation

end
