class CicCodeRequirement < ActiveRecord::Base
  belongs_to :cic_code
  belongs_to :requirement
  attr_accessible :cic_code_id, :requirement_id
end
