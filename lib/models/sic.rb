require 'data_mapper'
require 'csv'

DataMapper.setup(:default, ENV['DATABASE_URL'])

class Sic
  include DataMapper::Resource
  property :id, Serial
  property :code, Integer
  property :description, Text
end

#Sic.auto_migrate!
DataMapper.finalize


#CSV.foreach("data/sic_index.csv") do |row|
  #sic = Sic.create(:code => row[0], :description => row[1].upcase)
  #sic.save!
#end

