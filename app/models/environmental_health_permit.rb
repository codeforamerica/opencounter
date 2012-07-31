class EnvironmentalHealthPermit < ActiveRecord::Base
  belongs_to :business
  attr_accessible :app_type, 
                  :bakery, 
                  :commissary, 
                  :food_service, 
                  :food_type, 
                  :kitchen, 
                  :mailing_city, 
                  :mailing_detail, 
                  :mailing_state, 
                  :mailing_street, 
                  :mailing_zip, 
                  :phone, 
                  :previous_name, 
                  :processing, 
                  :vending, 
                  :vending_sub1, 
                  :vending_sub2
  
  validates_format_of :phone, 
                      :message => "must be a valid telephone number.", 
                      :with => /^[\(\)0-9\- \+\.]{10,20}$/i
end
