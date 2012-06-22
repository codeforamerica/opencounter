require 'csv'
require 'sinatra/activerecord'

class Naics < ActiveRecord::Base
  def self.populate
    CSV.foreach("data/naics_index.csv") do |row|
        naics = Naics.new(:code => row[0], :description => row[1])
        naics.save
    end
  end
end


