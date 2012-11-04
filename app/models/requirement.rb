class Requirement < ActiveRecord::Base
  has_many :cic_code_requirements, :dependent => :destroy
  has_many :cic_codes, :through => :cic_code_requirements
  attr_accessible :name, :notes, :jurisdiction
end
