# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :form do
    sequence :title do |n|
      "form-#{n}"
    end
  end
end
