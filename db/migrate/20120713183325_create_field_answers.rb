class CreateFieldAnswers < ActiveRecord::Migration
  def change
    create_table :field_answers do |t|
      t.integer :field_id
      t.integer :user_id
      t.text :answer

      t.timestamps
    end
  end
end
