# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :commercially_sited_business do
    business_id nil
    apn 1
    zoning_district "MyString"
    intended_use "MyString"
    prior_use "MyString"
    area_sqft_total 1.5
    area_sqft_first_floor 1.5
    area_sqft_outdoor 1.5
    is_single_tenant false
    car_parking_spaces 1
    bicycle_parking_spaces 1
  end
end
