class AddJurisdictionToForms < ActiveRecord::Migration
  def change

    add_column :forms, :jurisdiction, :string

  end
end
