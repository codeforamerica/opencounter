class IrsEinApplication < ActiveRecord::Base
  belongs_to :business

  attr_accessible :start_date,
                  :has_vehicle_over_55klbs,
                  :has_gambling,
                  :has_form720,
                  :has_atf,
                  :has_employees_who_need_w2s,
                  :can_be_legally_bound,
                  :care_of_name,
                  :closing_month_of_acc_year,
                  :first_pay_day,
                  :most_employees_next_year,
                  :agricultural_employees,
                  :other_employees,
                  :has_emp_liability_under_1k,
                  :llc_members,
                  :responsible_party_name,
                  :is_managing_member_of_llc
end
