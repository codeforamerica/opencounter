class AddSubmittedToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :submitted, :boolean
  end
end
