require 'csv-mapper'

class SicController < ApplicationController
  def index
    results = CsvMapper.import(Rails.root + 'app/assets/csv/zoning_and_sic_codes.csv') do
      start_at_row 1
      [industry, subtype, code]
    end

    @response = results.first

    render :json => @response
  end
end
