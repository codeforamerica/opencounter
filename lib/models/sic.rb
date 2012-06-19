require 'data_mapper'
require 'csv'

DataMapper.setup(:default, ENV['DATABASE_URL'])

class Sic
  include DataMapper::Resource
  property :code, Serial
  property :description, Text
end

DataMapper.finalize

