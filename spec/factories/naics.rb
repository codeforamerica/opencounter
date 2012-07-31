# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :naic, :class => 'Naics' do
    code 1
    description "MyText"
  end
end
