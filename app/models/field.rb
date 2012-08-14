class Field < ActiveRecord::Base
  attr_accessible :format, :prompt, :name, :key

  has_many :answers
  has_and_belongs_to_many :forms
end
