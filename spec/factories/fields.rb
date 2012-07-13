# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :field do
    form_id 1
    format "MyString"
    prompt "MyText"
  end
end
