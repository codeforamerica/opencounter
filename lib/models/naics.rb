require 'csv'
require 'sinatra/activerecord'
require 'pg_search'

class Naics < ActiveRecord::Base
  include PgSearch

  @@base_codes = [0,11,21,22,23,31,42,44,48,51,52,53,54,55,56,61,62,71,72,81,92]

  pg_search_scope :search_by_description,
  :against => :description,
  :using => {
    :tsearch => {:dictionary => 'english', :any_word => true}
  }

  pg_search_scope :search_all_words,
  :against => :description,
  :using => {
    :tsearch => {:dictionary => 'english'}
  }

  def self.populate
    CSV.foreach("data/naics_index.csv") do |row|
      the_code = row[0].to_i
      the_short = the_code/10000
      real_short = 0
      @@base_codes.each do |base|
        real_short = base unless base > the_short
      end
      the_desc = row[1]
      naics = Naics.new(:code => the_code, :short_code => real_short, :description => the_desc)
      naics.save
    end
  end

  def self.relevant_search(query, category=0)
    if (category == 0)
      return Naics.search_by_description(query)
    else
      match_cat = Naics.where(:short_code => category)
      match_desc = Naics.search_by_description(query)
      return match_cat & match_desc
    end

  end

end


