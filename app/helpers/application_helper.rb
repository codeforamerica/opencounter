module ApplicationHelper
  def user_answer_value(user, key_name)
    if user.try(:current_business).try(:answers).blank?
      return ''
    else
      user.current_business.answers.find_by_field_name(key_name).try(:value)
    end
  end
end
