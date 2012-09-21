class Answer < ActiveRecord::Base
  attr_accessible :value, :field_id, :business_id

  belongs_to :field
  belongs_to :business

  validates_presence_of :value
end
