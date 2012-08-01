class User < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :phone, :role, :last_state, :token, :email

  has_many :field_answers
  has_and_belongs_to_many :businesses

  validates_presence_of :email
  validates_format_of :email, 
                      :message => "must be a valid email address.",
                      :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :role
  validates_presence_of :phone
  validates_format_of :phone, 
                      :message => "must be a valid telephone number.", 
                      :with => /^[\(\)0-9\- \+\.]{10,20}$/i


  def self.inherited(child)
    child.instance_eval do
      def model_name
        User.model_name
      end
    end
    super
  end
end
