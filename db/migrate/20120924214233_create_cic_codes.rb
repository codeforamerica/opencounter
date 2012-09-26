class CreateCicCodes < ActiveRecord::Migration
  def change
    create_table :cic_codes do |t|
      t.string  :code
      t.string  :industry
      t.string  :subindustry
      t.text    :keywords
      t.boolean :home_occ_prohibited, :default => false
      t.timestamps
    end
    add_index :cic_codes, :code
    add_index :cic_codes, :keywords
  end
end
