class UsePermit < ActiveRecord::Base
  belongs_to :business

  attr_accessible :lot_size,
                  :proposed_sqft,
                  :existing_sqft,
                  :total_sqft,
                  :height_ft,
                  :height_stories,
                  :accessory_height_ft,
                  :accessory_height_stories,
                  :wall_sqft,
                  :lot_frontage_length,
                  :lot_frontage_sqft,
                  :building_frontage_length,
                  :special,
                  :maintenance
end
