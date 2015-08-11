class AdminUser < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :trackable, :validatable

  def create
    AdminUser.create(params[:adminuser])
  end

  private
    def adminuser_params
      params.require(:adminuser).permit(:email, :password, :password_confirmation, :remember_me)
    end

  # Setup accessible (or protected) attributes for your model
  #attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

end
