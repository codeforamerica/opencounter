# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :owner, :class => 'Owners' do
    business_id nil
    position "MyString"
    first_name "MyString"
    last_name "MyString"
    physical_address_street "MyString"
    physical_address_detail "MyString"
    physical_address_city "MyString"
    physical_address_state "MyString"
    physical_address_zip 1
  end
end
