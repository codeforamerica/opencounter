class CreateNaics < ActiveRecord::Migration
  def change
    create_table :naics do |t|
      t.integer :code
      t.text :description

      t.timestamps
    end
  end
end
