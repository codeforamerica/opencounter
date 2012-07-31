class CreateUtilityApplications < ActiveRecord::Migration
  def change
    create_table :utility_applications do |t|
      t.reference :business
      t.string :previous_city
      t.string :previous_detail
      t.string :previous_state
      t.string :previous_street
      t.integer :previous_zip
      t.integer :fax
      t.integer :business_license_number
      t.date :business_license_expiry_date
      t.date :service_start_date
      t.integer :container
      t.boolean :has_multiple_pickups
      
      t.timestamps
    end
  end
end
