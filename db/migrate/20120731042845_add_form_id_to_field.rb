class AddFormIdToField < ActiveRecord::Migration
  def change
    add_column :fields, :form_id, :integer
  end
end
