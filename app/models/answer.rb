class Answer < ActiveRecord::Base
  attr_accessible :text, :form_id, :business_id

  belongs_to :field
  belongs_to :business
end
