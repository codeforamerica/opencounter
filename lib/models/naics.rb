require 'csv'
require 'sinatra/activerecord'
require 'pg_search'

class Naics < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_description,
  :against => :description,
  :using => {
    :tsearch => {:dictionary => 'english',
      :any_word => 'true'
    }
  }

  def self.populate
    CSV.foreach("data/naics_index.csv") do |row|
      naics = Naics.new(:code => row[0], :description => row[1])
      naics.save
    end
  end

  def self.relevant_search(query)
    first = query
    first = first.split[0]
    @search_all = Naics.search_by_description(query)
    @search_first = Naics.search_by_description(first)
    @search_first | @search_all
  end
end


