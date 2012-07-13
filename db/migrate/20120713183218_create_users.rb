class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstName
      t.string :lastName
      t.text :lastState
      t.string :email
      t.string :token

      t.timestamps
    end
  end
end
