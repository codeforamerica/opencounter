# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :zoning_district do
    code "MyString"
    name "MyString"
    description "MyText"
    home_occ_prohibited false
  end
end
