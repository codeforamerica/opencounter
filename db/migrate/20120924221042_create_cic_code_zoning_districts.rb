class CreateCicCodeZoningDistricts < ActiveRecord::Migration
  def change
    create_table :cic_code_zoning_districts do |t|
      t.integer :cic_code_id
      t.integer :zoning_district_id
      t.integer :permission, :default => 5
      t.boolean :home_occ_prohibited, :default => false
      t.text :notes
      t.timestamps
    end
    add_index :cic_code_zoning_districts, :cic_code_id
    add_index :cic_code_zoning_districts, :zoning_district_id
  end
end
