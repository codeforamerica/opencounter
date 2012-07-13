class User < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :last_state, :token

  has_many :field_answers
end
