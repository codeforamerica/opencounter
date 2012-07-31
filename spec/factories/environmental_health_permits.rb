# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :environmental_health_permit do
    app_type "MyText"
    food_type "MyText"
    food_service "MyText"
    bakery "MyText"
    processing false
    vending false
    vending_sub1 1
    vending_sub2 "MyText"
    commissary false
    kitchen false
    mailing_city "MyString"
    mailing_state "MyString"
    mailing_street "MyString"
    mailing_detail "MyString"
    mailing_zip 1
    phone 1
    previous_name "MyText"
  end
end
