class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.string :format
      t.text :prompt

      t.timestamps
    end
  end
end
