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

  def cic_code_params
    params.require(:answer).permit(:code, :industry, :subindustry, :home_occ_prohibited, :keywords, :parent_id, :requirements, :requirement_ids, :requirements_attributes)
  end

end
