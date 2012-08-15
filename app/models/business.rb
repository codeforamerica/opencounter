class Business < ActiveRecord::Base
  belongs_to :user
  has_many :answers
  attr_accessible :name, :description 
end
