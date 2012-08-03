class Field < ActiveRecord::Base
  attr_accessible :format, :prompt, :name, :key

  has_many :answers, :through => :field_answer
  has_and_belongs_to_many :forms
end
