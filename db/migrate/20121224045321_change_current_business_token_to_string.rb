class ChangeCurrentBusinessTokenToString < ActiveRecord::Migration
  def up
  	remove_column :users, :current_business_token
  	add_column :users, :current_business_token, :string
  end

  def down
  	remove_column :users, :current_business_token
  	add_column :users, :current_business_token, :integer
  end
end
