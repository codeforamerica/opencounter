# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :fee, :class => 'Fees' do
    conditions "MyText"
    formula "MyText"
    payable_to "MyText"
  end
end
