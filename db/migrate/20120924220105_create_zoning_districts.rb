class CreateZoningDistricts < ActiveRecord::Migration
  def change
    create_table :zoning_districts do |t|
      t.string :code
      t.string :name
      t.text :description
      t.boolean :home_occ_prohibited, :default => false
      t.timestamps
    end
    add_index :zoning_districts, :code
  end
end
