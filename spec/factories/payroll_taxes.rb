# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :payroll_taxis, :class => 'PayrollTax' do
    owner1_first "MyString"
    owner1_last "MyString"
    owner2_first "MyString"
    owner2_last "MyString"
  end
end
