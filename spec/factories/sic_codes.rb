# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :sic_code do
    code "MyString"
    industry "MyString"
    subindustry "MyString"
    parent_id 1
  end
end
