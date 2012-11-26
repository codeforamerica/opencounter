class AddSubmittedAtToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :submitted_at, :datetime
  end
end
