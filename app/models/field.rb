class Field < ActiveRecord::Base
  attr_accessible :format, :prompt, :name

  has_many :answers
  has_and_belongs_to_many :forms

  validates_presence_of :name
  validates_uniqueness_of :name
end
