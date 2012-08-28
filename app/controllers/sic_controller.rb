require 'csv-mapper'

class SicController < ApplicationController
  def index
    results = CsvMapper.import(Rails.root + 'app/assets/csv/zoning_and_sic_codes.csv') do
      start_at_row 1
      [industry, subtype, code, industry_subtype, recheck, sic_name, sic_code, alternate_code]
    end

    @response = results.first

    render :json => @response
  end
end
