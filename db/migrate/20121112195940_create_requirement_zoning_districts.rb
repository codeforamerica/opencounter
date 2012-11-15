class CreateRequirementZoningDistricts < ActiveRecord::Migration
  
  def up  
    create_table :requirement_zoning_districts do |t|
      t.integer :zoning_district_id
      t.integer :requirement_id
      t.timestamps
    end
    add_index :requirement_zoning_districts, :zoning_district_id
    add_index :requirement_zoning_districts, :requirement_id
  end
  
  def down
    drop_table :requirement_zoning_districts
  end
end
