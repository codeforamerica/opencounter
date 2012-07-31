class User < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :phone, :role, :last_state, :token

  has_many :field_answers

  validates_presence_of :email
  validates_format_of :email, 
                      :message => "must be a valid email address.",
                      :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_presence_of :first_name
  validates_presence_of :last_name
  #Is role a field on user signup? 
  #validates_presence_of :role
  #validates_presence_of :phone
  validates_format_of :phone, 
                      :message => "must be a valid telephone number.", 
                      :with => /^[\(\)0-9\- \+\.]{10,20}$/
end
