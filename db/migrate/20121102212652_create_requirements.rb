class CreateRequirements < ActiveRecord::Migration
  def change
    create_table :requirements do |t|
      t.string :name
      t.text :notes
      t.string :jurisdiction
      t.timestamps
    end
    
    create_table :cic_codes_requirements, :id => false do |t|
      t.integer :cic_code_id
      t.integer :requirement_id
    end
  end
end
