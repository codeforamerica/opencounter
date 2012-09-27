class AddParentIdToCicCodes < ActiveRecord::Migration
  def change
    add_column :cic_codes, :parent_id, :integer
  end
end
