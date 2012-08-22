class RemoveUserIdFromAnswer < ActiveRecord::Migration
  def up
    remove_column :answers, :user_id
  end

  def down
    add_column :answers, :user_id, :integer
  end
end
