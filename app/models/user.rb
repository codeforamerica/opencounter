class User < ActiveRecord::Base
  # FIXME: I don't think id should be exposed
  attr_accessible :first_name, :last_name, :email, :phone, :role, 
                  :last_state, :token, :created_at, :id, :updated_at, 
                  :remember_token, :password, :password_confirmation,
                  :account_type

  has_many :businesses
  has_many :answers, :through => :businesses

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence:   true,
                    format:     { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  validates_uniqueness_of :token

  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true

  has_secure_password

  after_create :assign_token, :create_business

  # TODO: This should return the current business not the most recent business
  def current_business
    self.businesses.order("updated_at DESC").limit(1).first
  end

  def full_name
    "#{try(:first_name)} #{try(:last_name)}"
  end

  private

  def assign_token
    update_attribute(:token, (Digest::MD5.hexdigest "#{SecureRandom.hex(10)}-#{DateTime.now.to_s}"))
  end

  def create_business
    self.businesses << Business.create()
  end
end
