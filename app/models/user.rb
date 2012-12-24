class User < ActiveRecord::Base
  # FIXME: I don't think id should be exposed
  attr_accessible :first_name, :last_name, :email, :phone, :role, 
                  :last_state, :token, :created_at, :id, :updated_at, 
                  :remember_token, :password, :password_confirmation,
                  :account_type, :current_business_token

  has_many :businesses
  # has_many :answers, :through => :businesses

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence:   true,
                    format:     { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  validates_uniqueness_of :token

  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true

  has_secure_password

  after_create :assign_token, :add_business

  def current_business
    Business.find_by_token(self.current_business_token) || self.businesses.order("updated_at DESC").limit(1).first
  end

  def full_name
    "#{try(:first_name)} #{try(:last_name)}"
  end

  def add_business
    business = Business.create
    self.businesses << business
    # TODO: multiple businesses
    update_attribute(:current_business_token , business.token)
  end

  def assign_business(business)
    business.user = self
    business.save
    # TEMP: normally you would only switch the current business on UI event
    update_attribute(:current_business_token , business.token)
  end

  private

  def assign_token
    update_attribute(:token, SecureRandom.hex(16))
  end

end
