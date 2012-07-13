class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.string :format
      t.integer :form_id
      t.string :prompt

      t.timestamps
    end
  end
end
