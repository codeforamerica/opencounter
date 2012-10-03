require 'fuzzystringmatch'

class CicCodesController < ApplicationController
  def index
    cic_codes = []
    CicCode.all.each do |cic_code|
      cic_codes << {code: cic_code.code, industry: cic_code.industry, subindustry: cic_code.subindustry, industry_subindustry: cic_code.industry_subindustry, keywords: cic_code.search_terms}
    end
    query = params['q'].downcase
    query_distances = Array.new(cic_codes.length)
    terms = query.split(%r{\s+})

    jarow = FuzzyStringMatch::JaroWinkler.create( :pure )

    terms.each_with_index { |term, tindex|
      cic_codes.each_with_index { |cic_code, index|
        cic_code[:query_distance] = 0 if tindex == 0
        cic_code[:query_distance] +=1 unless cic_code[:keywords].try(:downcase).try(:match, term).blank?
        cic_code[:query_distance] += jarow.getDistance(query, cic_code[:keywords].try(:downcase))
      }
    }

    cic_codes = cic_codes.sort{ |a, b| b[:query_distance] <=> a[:query_distance]}

    render :json => cic_codes[0...10]
  end

  def update
  # update your model
  @cic_code = CicCode.find(params[:id])
  @cic_code.update_attributes!(params[:cic_code])

  format.html {
    if request.xhr?
      # *** repond with the new value ***
      render :text => params[:cic_code].values.first
    else
      redirect_to(@cic_code, :notice => 'CIC Code was successfully updated.')
    end
  }
  end
end
