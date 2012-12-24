class AddTokenIndexToUsers < ActiveRecord::Migration
  def change
  	add_index :users, :token
  end
end
