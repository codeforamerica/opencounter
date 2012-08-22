class AddBusinessIdToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :business_id, :integer
  end
end
