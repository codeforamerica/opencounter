class Answer < ActiveRecord::Base
  #attr_accessible :value, :field_name, :business_id

  belongs_to :business
  has_one :user, :through => :business

  validates_presence_of :value

  private 
end
