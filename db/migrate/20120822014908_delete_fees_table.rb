class DeleteFeesTable < ActiveRecord::Migration
  def up
    drop_table :fees
  end

  def down
    create_table :fees do |t|
      t.text :conditions
      t.text :formula
      t.text :payable_to

      t.timestamps
    end
  end
end
