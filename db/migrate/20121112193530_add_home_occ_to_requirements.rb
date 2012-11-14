class AddHomeOccToRequirements < ActiveRecord::Migration
  def change
    add_column :requirements, :home_occ, :boolean, :default => false
    add_column :requirements, :commercial, :boolean, :default => false
  end
end
