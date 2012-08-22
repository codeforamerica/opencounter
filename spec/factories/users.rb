# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
    email Faker::Internet.email
    #token Random.rand(0..10000)

    factory :invalid_user do
      email nil
    end
  end
end
