class Requirement < ActiveRecord::Base
  has_and_belongs_to_many :cic_codes, :uniq => true
  attr_accessible :name, :notes, :jurisdiction
end
