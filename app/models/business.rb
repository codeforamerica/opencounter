class Business < ActiveRecord::Base
  belongs_to :user
  has_many :answers
  attr_accessible :name, :description, :answers_attributes
  accepts_nested_attributes_for :answers, :reject_if => :all_blank
end
