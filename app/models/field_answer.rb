class FieldAnswer < ActiveRecord::Base
  attr_accessible :answer, :form_id, :user_id

  belongs_to :field
  belongs_to :user
end
