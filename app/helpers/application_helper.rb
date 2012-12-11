module ApplicationHelper
  def answer_value(user, key_name)
    if user.blank? || user.answers.blank?
      return ''
    else
      user.answers.find_by_field_name(key_name).try(:value)
    end
  end
end
