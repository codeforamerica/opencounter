class CicCode < ActiveRecord::Base
  belongs_to :parent, :class_name => "CicCode", :foreign_key => "parent_id"
  has_many :children, :class_name => "CicCode", :foreign_key => "parent_id"
  has_many :cic_code_zoning_districts, :dependent => :destroy
  has_many :zoning_districts, :through => :cic_code_zoning_districts, :dependent => :destroy, :order => "code ASC"
  has_and_belongs_to_many :sic_codes, :uniq => true
  attr_accessible :code, :industry, :subindustry, :home_occ_prohibited, :keywords, :parent_id
  after_create :create_zoning_district_connections
  
  def permission_name(zoning_district_id)
    CicCodeZoningDistrict.cross_reference(self.id, zoning_district_id).try(:permission_name)    
  end
  
  def industry_subindustry
    terms = ''
    terms += industry
    terms += ' - '
    terms += subindustry
    return terms
  end
  
  def search_terms
    terms = ''
    terms += industry + ', ' if industry.present?
    terms += subindustry + ', ' if subindustry.present?
    terms += keywords + ', ' if keywords.present?
    return terms
  end
  
  private
  
  def create_zoning_district_connections
    ZoningDistrict.all.each do |zoning_district|
      CicCodeZoningDistrict.find_or_create_by_cic_code_id_and_zoning_district_id(self.id, zoning_district.id)
    end
  end
end
