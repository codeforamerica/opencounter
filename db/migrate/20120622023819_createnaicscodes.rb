class Createnaicscodes < ActiveRecord::Migration
  def up
    create_table :naics do |t|
      t.integer :code
      t.text :description
    end
    add_index :naics, :code
  end

  def down
    drop_table :naics
  end
end
