class ChangeFieldIDtoFieldName < ActiveRecord::Migration
  def up
    change_table :answers do |t|
      t.remove :field_id
      t.string :field_name
    end
  end

  def down
    change_table :answers do |t|
      t.remove :field_name
      t.id :field_id
    end
  end
end
