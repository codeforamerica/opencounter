class CicCode < ActiveRecord::Base
  belongs_to :parent, :class_name => "CicCode", :foreign_key => "parent_id"
  has_many :children, :class_name => "CicCode", :foreign_key => "parent_id"
  has_many :cic_code_zoning_districts, :dependent => :destroy
  has_many :zoning_districts, :through => :cic_code_zoning_districts, :dependent => :destroy, :order => "code ASC"
  has_and_belongs_to_many :sic_codes, :uniq => true
  has_many :cic_code_requirements, :dependent => :destroy
  has_many :requirements, :through => :cic_code_requirements, :order => "name ASC"
  
  accepts_nested_attributes_for :requirements
  
  attr_accessible :code, :industry, :subindustry, :home_occ_prohibited, :keywords, :parent_id, :requirements, :requirement_ids, :requirements_attributes
  
  before_save :strip_code
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
  
  def requirement_names
    requirement_names = self.requirements.collect {|x| x.name }
    requirement_names.join(', ')
  end
  
  private
  
  def strip_code
    self.code.strip
  end
  
  def create_zoning_district_connections
    ZoningDistrict.all.each do |zoning_district|
      CicCodeZoningDistrict.find_or_create_by_cic_code_id_and_zoning_district_id(self.id, zoning_district.id)
    end
  end
end
