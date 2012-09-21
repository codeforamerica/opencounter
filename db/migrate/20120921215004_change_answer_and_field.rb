class ChangeAnswerAndField < ActiveRecord::Migration
  def up
    change_table :answers do |t|
      t.rename :text, :value
    end

    change_table :fields do |t|
      t.remove :key
    end
  end

  def down
    change_table :answers do |t|
      t.rename :value, :value
    end

    change_table :fields do |t|
      t.string :key
    end
  end
end
