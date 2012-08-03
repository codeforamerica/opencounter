class Form < ActiveRecord::Base
  attr_accessible :title, :jurisdiction

  has_and_belongs_to_many :fields
end
