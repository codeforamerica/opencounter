class SecStateRegistration < ActiveRecord::Base
  belongs_to :business
  attr_accessible :agent_first, :agent_last, :city, :detail, :llc_managers, :llp_type, :related_llp, :shares, :state, :street, :zip
end
