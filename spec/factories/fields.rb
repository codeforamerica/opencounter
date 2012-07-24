# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :field do
    format "string"
    prompt Faker::Lorem.sentence
    form
  end
end
