class User < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :email, :phone, :role, :last_state, :token

  has_many :businesses
  has_many :answers, :through => :businesses

  validates_presence_of :email
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_presence_of :first_name
  validates_presence_of :last_name

  validates_uniqueness_of :token

  after_create :assign_token

  def assign_token
    update_attributes(:token => User.generate_token)
  end

  private

  def self.generate_token
    token = (Digest::MD5.hexdigest "#{SecureRandom.hex(10)}-#{DateTime.now.to_s}")
  end
end
