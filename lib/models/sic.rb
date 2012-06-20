require 'data_mapper'
require 'csv'

DataMapper.setup(:default, ENV['DATABASE_URL'])

class Sic
  include DataMapper::Resource
  property :id, Serial
  property :code, Integer
  property :description, Text
end

DataMapper.finalize


def populate
  Sic.auto_migrate!
  CSV.foreach("data/sic_index.csv") do |row|
    sic = Sic.create(:code => row[0], :description => row[1])
    sic.save!
  end
end

