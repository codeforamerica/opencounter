class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.integer :phone
      t.string :role
      t.string :last_state
      t.string :token
      t.string :physical_address_city
      t.string :physical_address_detail
      t.integer :physical_address_zip
      t.string :physical_address_street
      t.string :physical_address_state
      t.integer :drivers_license_number
      t.boolean :has_owned_eed_business
      t.integer :eed_account
      t.string :business_name
      t.string :eed_detail
      t.string :eed_street
      t.string :eed_state
      t.string :eed_city
      t.integer :eed_zip
      t.string :position
      t.string :type

      t.timestamps
      
    end
end
