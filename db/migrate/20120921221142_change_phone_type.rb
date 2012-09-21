class ChangePhoneType < ActiveRecord::Migration
  def up
    change_table :users do |t|
      t.change :phone, :string
    end
  end

  def down
    change_table :users do |t|
      t.change :phone, :integer
    end
  end
end
