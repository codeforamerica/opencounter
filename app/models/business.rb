class Business < ActiveRecord::Base
  belongs_to :user
  has_many :answers
  attr_accessible :name, :description, :submitted, :submitted_at

  scope :submitted, -> { where(submitted: true) }

  def mark_submitted
    update_attributes(submitted: true)
    update_attributes(submitted_at: Time.now)
  end

  def submitted?
    submitted || false
  end

  def submitted_at_s
    submitted_at.in_time_zone('Pacific Time (US & Canada)').strftime('%m/%d/%Y at %I:%M%p')
  end

  # answers are a hash of key/value pairs
  # TODO: proper error handling
  def save_answers(answers)
    Rails.logger.info "save_answers method called: #{answers.each{|k,v| [k,v]}}"
    errors = []
    answers.each do |key, value|
      p "#{key}, #{value}"
      field = Field.find_by_name(key)
      unless field.nil? 
        # unless field doesn't exist
        # check if answer already exists
        ans = Answer.where(business_id: self, field_id: field)
        unless ans.empty?
          ans[0].update_attributes(text: value)
        else
          # otherwise create it
          ans = self.answers.create(:text => value)
          field.answers << ans
        end
      else
        errors << "Error creating answer. Key #{key} not found"
      end
    end
    return errors
  end
end
