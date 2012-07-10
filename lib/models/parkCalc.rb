require 'csv'
require 'sinatra/activerecord'

class ParkingCalc < ActiveRecord::Base

  def self.populate
    CSV.foreach("data/ParkingCalc_index.csv") do |row|

      bizName 	  = row[0]
      catName 	  = row[1]
      ruleList 	  = Array.new(row[2].split(/;*/)
      noteList 	  = Array.new(row[3].split(/;*/)
      calcPrompt  = Array.new(row[4].split(/;*/)

      biz = ParkingCalc.new(:name => bizName, :cat_name => catName, :rules => ruleList,
			    :notes => noteList, :calc_prompt => calcPrompt)
      biz.save
    end
  end
end
