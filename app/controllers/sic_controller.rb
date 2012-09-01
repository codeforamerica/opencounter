require 'csv-mapper'
require 'fuzzystringmatch'

class SicController < ApplicationController
  def index
    results = CsvMapper.import(Rails.root + 'app/assets/csv/zoning_and_sic_codes.csv') do
      start_at_row 1
      [industry, subtype, code, industry_subtype, recheck, sic_name, sic_code, alternate_code, query_distance]
    end
    query = params['q']
    query_distances = Array.new(results.length)

    jarow = FuzzyStringMatch::JaroWinkler.create( :pure )

    terms = query.split(%r{\s+})

    terms.each_with_index { |term, tindex |
      results.each_with_index { |result, index  |

        if tindex ==0
          result.query_distance =0
        end

        cmb_str = (result.sic_name ? result.sic_name : "") + " " + result.subtype + " " + result.industry
        cmb_str = cmb_str.downcase
        if !cmb_str.index(term).nil?
          result.query_distance +=1
        end

        result.query_distance  += jarow.getDistance(query, (result.sic_name ? result.sic_name : "") + result.subtype + result.industry)
      }
    }

    results = results.sort{ |a, b| b.query_distance  <=> a.query_distance}
    @response = results[0..10]

    render :json => @response
  end
end
