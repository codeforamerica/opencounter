class CreateSicCodes < ActiveRecord::Migration
  def change
    create_table :sic_codes do |t|
      t.string :code
      t.string :industry
      t.string :subindustry
      t.integer :parent_id
      t.timestamps
    end
    add_index :sic_codes, :code
    
    create_table :cic_codes_sic_codes, :id => false do |t|
      t.integer :cic_code_id
      t.integer :sic_code_id
    end
    add_index :cic_codes_sic_codes, :cic_code_id
    add_index :cic_codes_sic_codes, :sic_code_id
  end
end
