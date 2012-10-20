class SicCode < ActiveRecord::Base
  has_and_belongs_to_many :cic_codes, :uniq => true
  attr_accessible :code, :industry, :parent_id, :subindustry
end
