class AddSortOrderToRequirements < ActiveRecord::Migration
  def change
    add_column :requirements, :sort_order, :integer
  end
end
