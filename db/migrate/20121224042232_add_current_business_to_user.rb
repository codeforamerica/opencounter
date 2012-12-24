class AddCurrentBusinessToUser < ActiveRecord::Migration
  def change
    add_column :users, :current_business_token, :integer
  end
end
