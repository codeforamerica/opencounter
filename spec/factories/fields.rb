# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :field do
    format "string"
    prompt Faker::Lorem.sentence

    after(:create) do |field|
      field.forms.create(FactoryGirl.attributes_for(:form))
    end
  end
end
