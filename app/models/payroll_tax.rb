class PayrollTax < ActiveRecord::Base
  belongs_to :business #we can get owner info from here
  
  attr_accessible :set_state_id, :quarter_wage_over_100, :year_wage_over_100, :first_payroll_date, :application_type, :purchased_biz, :previous_owner_first, :previous_owner_last, :previous_eed_account_number, :date_of_transfer, :california_employees, :taxpayer_type, :employer_type, :is_employee_family, :industry_type, :other, :contact_first, :contact_last, :contact_street, :contact_detail, :contact_state, :contact_city, :contact_zip, :contact_phone, :contact_email


  validates_format_of :phone, 
                      :message => "must be a valid telephone number.", 
                      :with => /^[\(\)0-9\- \+\.]{10,20}$/i

  
  validates_format_of :email, 
                      :message => "must be a valid email address.",
                      :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
end
