require 'csv-mapper'
require 'fuzzystringmatch'

class SicController < ApplicationController
  def index
    num_responses = 5
    results = CsvMapper.import(Rails.root + 'app/assets/csv/zoning_and_sic_codes.csv') do
      start_at_row 1
      [industry, subtype, code, industry_subtype, recheck, sic_name, sic_code, alternate_code]
    end
    query = params['q']
    query_distances = Array.new(results.length)

    jarow = FuzzyStringMatch::JaroWinkler.create( :native )

    results.each_with_index { |result, index  |
      query_distances[index] = jarow.getDistance(query, result.subtype + result.industry)
    }

    sorted_distances = query_distances.sort{|x,y| y <=> x}

    results_response = []

    for i in 1..num_responses
      results_response.push(results[query_distances.index(sorted_distances[i-1])])
    end

    @response = results_response
    render :json => @response
  end
end
