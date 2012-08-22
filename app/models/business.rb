class Business < ActiveRecord::Base
  belongs_to :user
  has_many :answers
  attr_accessible :name, :description

  # answers are a hash of key/value pairs
  def save_answers(answers)


  end
end
