class AddTokenToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :token, :string
  end
end
