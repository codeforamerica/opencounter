class CreateBusiness < ActiveRecord::Migration
  def change 
    create_table :business do |t|
      t.text :description
      t.boolean :is_home_occ
      t.boolean :is_sole_owner
      t.string :mailing_address_street
      t.string :mailing_address_city
      t.string :mailing_address_detail
      t.string :mailing_address_state
      t.integer :mailing_address_zip
      t.string :physical_address_street
      t.string :physical_address_city
      t.string :physical_address_detail
      t.string :physical_address_state
      t.integer :physical_address_zip
      t.string :name
      t.integer :phone
      t.string :structure
      t.string :type
      t.integer :apn
      t.float :area_sqft_first_floor
      t.float :area_sqft_outdoor
      t.float :area_sqft_total
      t.integer :bicycle_parking_spaces
      t.integer :car_parking_spaces
      t.text :intended_use
      t.boolean :is_single_tenant
      t.text :prior_use
      t.string :zoning_district

      t.timestamp

    end
  end
end
