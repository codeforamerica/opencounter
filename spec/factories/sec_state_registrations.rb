# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :sec_state_registration do
    agent_first "MyString"
    agent_last "MyString"
    shares 1
    llc_managers "MyText"
    llp_type "MyText"
    related_llp "MyText"
    street "MyString"
    zip 1
    state "MyString"
    detail "MyString"
    city "MyString"
  end
end
