class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name
      t.string :description
      t.string :structure
      t.string :type
      t.boolean :is_home_occ
      t.string :physical_address_street
      t.string :physical_address_detail
      t.string :physical_address_city
      t.string :physical_address_state
      t.integer :physical_address_zip
      t.string :mailing_address_street
      t.string :mailing_address_detail
      t.string :mailing_address_city
      t.string :mailing_address_state
      t.integer :mailing_address_zip
      t.integer :phone
      t.boolean :is_sole_owner

      t.timestamps
    end
  end
end
