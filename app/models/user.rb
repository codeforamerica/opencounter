class User < ActiveRecord::Base
  # FIXME: I don't think id should be exposed
  attr_accessible :first_name, :last_name, :email, :phone, :role, :last_state, :token, :created_at, :id, :updated_at

  has_many :businesses
  has_many :answers, :through => :businesses

  validates_presence_of :email
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_presence_of :first_name
  validates_presence_of :last_name

  validates_uniqueness_of :token

  after_create :assign_token, :create_business

  # TODO: This should return the current business not the most recent business
  def current_business
    self.businesses.order("updated_at DESC").first
  end

  def full_name
    first_name + " " + last_name
  end

  private

  def assign_token
    update_attribute(:token, (Digest::MD5.hexdigest "#{SecureRandom.hex(10)}-#{DateTime.now.to_s}"))
  end

  def create_business
    self.businesses << Business.create()
  end
end
