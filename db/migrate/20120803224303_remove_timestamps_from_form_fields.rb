class RemoveTimestampsFromFormFields < ActiveRecord::Migration
  def change
    remove_column :fields_forms, :created_at
    remove_column :fields_forms, :updated_at
  end
end
