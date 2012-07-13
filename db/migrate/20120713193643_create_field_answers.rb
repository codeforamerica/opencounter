class CreateFieldAnswers < ActiveRecord::Migration
  def change
    create_table :field_answers do |t|
      t.text :answer
      t.integer :user_id
      t.integer :field_id

      t.timestamps
    end
  end
end
