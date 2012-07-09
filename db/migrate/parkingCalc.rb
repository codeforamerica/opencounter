class ParkingCalc < ActiveRecord::Migration
  def up
    create_table :parking do |t|
      t.text :name
      t.text :rules
      t.text :notes
      t.text :calc_prompt
    end
    # add_index :parking, :rule
  end

  def down
    drop_table :parking
  end
end
