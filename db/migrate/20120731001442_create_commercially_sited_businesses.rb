class CreateCommerciallySitedBusinesses < ActiveRecord::Migration
  def change
    create_table :commercially_sited_businesses do |t|
      t.references :business_id
      t.integer :apn
      t.string :zoning_district
      t.string :intended_use
      t.string :prior_use
      t.float :area_sqft_total
      t.float :area_sqft_first_floor
      t.float :area_sqft_outdoor
      t.boolean :is_single_tenant
      t.integer :car_parking_spaces
      t.integer :bicycle_parking_spaces

      t.timestamps
    end
    add_index :commercially_sited_businesses, :business_id_id
  end
end
