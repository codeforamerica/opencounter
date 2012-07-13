class User < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :last_state, :token

  has_many :field_answers

  validates_presence_of :email
  validates_format_of :email, :with 
  validates_presence_of :first_name
  validates_presence_of :last_name
end
