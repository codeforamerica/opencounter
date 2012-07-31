class CreateOwners < ActiveRecord::Migration
  def change
    create_table :owners do |t|
      t.references :business_id
      t.string :position
      t.string :first_name
      t.string :last_name
      t.string :physical_address_street
      t.string :physical_address_detail
      t.string :physical_address_city
      t.string :physical_address_state
      t.integer :physical_address_zip

      t.timestamps
    end
    add_index :owners, :business_id_id
  end
end
