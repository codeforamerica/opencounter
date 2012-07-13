# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :field_answer do
    answer "MyText"
    user_id 1
    form_id 1
  end
end
