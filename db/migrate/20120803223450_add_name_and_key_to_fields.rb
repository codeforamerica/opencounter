class AddNameAndKeyToFields < ActiveRecord::Migration
  def change
    add_column :fields, :name, :string
    add_column :fields, :key, :string
  end
end
