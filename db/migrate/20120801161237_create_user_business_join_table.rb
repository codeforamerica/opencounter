class CreateUserBusinessJoinTable < ActiveRecord::Migration
  def change
    create_table :users_businesses, :id => false do |t|
      t.integer :user_id
      t.integer :business_id
    end
  end
end
