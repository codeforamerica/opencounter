class FieldAnswer < ActiveRecord::Base
  attr_accessible :answer, :field_id, :user_id
end
