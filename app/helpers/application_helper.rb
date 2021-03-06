module ApplicationHelper
  def user_answer_value(user, key_name)
    if user.blank? || user.try(:current_business).try(:answers).blank? || user.current_business.answers.find_by_field_name(key_name).try(:value).blank?
      return ''
    else
      user.current_business.answers.find_by_field_name(key_name).value
    end
  end
end
