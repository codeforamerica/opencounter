class CreateFieldsForms < ActiveRecord::Migration
  def change
    create_table :fields_forms, :id => false do |t|
      t.references :field
      t.references :form

      t.timestamps
    end
  end
end
