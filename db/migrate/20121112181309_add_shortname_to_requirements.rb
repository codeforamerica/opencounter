class AddShortnameToRequirements < ActiveRecord::Migration
  def change
    add_column :requirements, :short_name, :string
  end
end
