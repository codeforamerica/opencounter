# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :business do
    name "MyString"
    description "MyString"
    structure "MyString"
    type ""
    is_home_occ false
    physical_address_street "MyString"
    physical_address_detail "MyString"
    physical_address_city "MyString"
    physical_address_state "MyString"
    physical_address_zip 1
    mailing_address_street "MyString"
    mailing_address_detail "MyString"
    mailing_address_city "MyString"
    mailing_address_state "MyString"
    mailing_address_zip 1
    phone 1
    is_sole_owner false
  end
end
