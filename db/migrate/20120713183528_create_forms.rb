class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.string :document
      t.string :title

      t.timestamps
    end
  end
end
