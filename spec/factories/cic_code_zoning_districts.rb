# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :cic_code_zoning_district do
    cic_code_id 1
    zoning_district_id 1
    permitted false
    permitted_aup false
    permitted_sup false
    prohibited false
    home_occ_prohibited false
    notes "MyText"
  end
end
