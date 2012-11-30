class CreateCicCodeRequirements < ActiveRecord::Migration
  def up
    drop_table :cic_codes_requirements
  
    create_table :cic_code_requirements do |t|
      t.integer :cic_code_id
      t.integer :requirement_id
      t.timestamps
    end
    add_index :cic_code_requirements, :cic_code_id
    add_index :cic_code_requirements, :requirement_id
  end
  
  def down
    drop_table :cic_code_requirements
    
    create_table :cic_codes_requirements, :id => false do |t|
      t.integer :cic_code_id
      t.integer :requirement_id
    end
    add_index :cic_codes_requirements, :cic_code_id
    add_index :cic_codes_requirements, :requirement_id
  end
end
