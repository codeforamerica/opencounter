require 'data_mapper'
require 'csv'

DataMapper.setup(:default, ENV['DATABASE_URL'])

class Naics
  include DataMapper::Resource
  property :id, Serial
  property :code, Integer
  property :description, Text, :lazy => false

  def self.populate
    Naics.auto_migrate!

    CSV.foreach("data/naics_index.csv") do |row|
      naics = Naics.create( :code => row[0], :description => row[1].upcase)
      naics.save!
    end
  end
end

DataMapper.finalize

