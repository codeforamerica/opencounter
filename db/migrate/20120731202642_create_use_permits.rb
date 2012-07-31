class CreateUsePermits < ActiveRecord::Migration
  def change
    create_table :use_permits do |t|
      t.reference :business
      t.integer :lot_size
      t.integer :proposed_sqft
      t.integer :existing_sqft
      t.integer :total_sqft
      t.integer :height_ft
      t.integer :height_stories
      t.integer :accessory_height_ft
      t.integer :accessory_height_stories
      t.integer :wall_sqft
      t.integer :lot_frontage_length
      t.integer :lot_frontage_sqft
      t.integer :building_frontage_length
      t.text :special
      t.text :maintenance

      t.timestamps
    end
  end
end
