class AddPhoneToUsers < ActiveRecord::Migration
  def change

    add_column :users, :phone, :int

  end
end
