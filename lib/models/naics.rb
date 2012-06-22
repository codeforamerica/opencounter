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
    unioned = order_by_first(query)
    coded = order_by_code(unioned)
    coded.first(50)
  end

  private
  def self.order_by_first(query)
    first = query.split[0]
    search_all = Naics.search_by_description(query)
    search_first = Naics.search_by_description(first).limit(50) #as we will limit results to 50
    search_first | search_all
  end

  private
  def self.order_by_code(arg)
    total= 0
    arg.each do |row|
      total += row.code
    end
    avg_code = total / 10.to_f
    arg.sort {|x,y| (x.code - avg_code).abs <=> (y.code - avg_code).abs}
  end
end


