class Requirement < ActiveRecord::Base
  has_many :cic_code_requirements, :dependent => :destroy
  has_many :cic_codes, :through => :cic_code_requirements
  has_many :requirement_zoning_districts, :dependent => :destroy
  has_many :zoning_districts, :through => :requirement_zoning_districts
  attr_accessible :name, :short_name, :notes, :jurisdiction, :home_occ, :commercial
  
  scope :home_occ, where(:home_occ => true)
  scope :commercial, where(:commercial => true)
end
