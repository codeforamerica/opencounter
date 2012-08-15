class Answer < ActiveRecord::Base
  attr_accessible :text, :field_id, :business_id

  belongs_to :field
  belongs_to :business
end
