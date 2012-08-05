class UsersController < InheritedResources::Base
  respond_to :html, :json, :xml

  def create
    create! do |success, failure|
      if success
        session[:user_id] = @user.id
      end
    end
  end
end
