class Answer < ActiveRecord::Base
  attr_accessible :value, :field_name, :business_id

  belongs_to :field, :primary_key => :name, :foreign_key => :field_name
  belongs_to :business

  validates_presence_of :value
end
