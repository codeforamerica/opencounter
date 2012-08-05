class CreateFees < ActiveRecord::Migration
  def change
    create_table :fees do |t|
      t.text :conditions
      t.text :formula
      t.text :payable_to

      t.timestamps
    end
  end
end
