require 'csv-mapper'
require 'fuzzystringmatch'

class SicController < ApplicationController
  def index
    results = CsvMapper.import(Rails.root + 'app/assets/csv/zoning_and_sic_codes.csv') do
      start_at_row 1
      [industry, subtype, code, industry_subtype, recheck, sic_name, sic_code, alternate_code]
    end
    query = params['q']
    query_distances = Array.new(results.length)

    jarow = FuzzyStringMatch::JaroWinkler.create( :native )

    results.each_with_index { |result, index  |
      query_distances[index] = jarow.getDistance(query, result.industry_subtype)
    }

    @response = results[query_distances.index(query_distances.max)]

    render :json => @response
  end
end
