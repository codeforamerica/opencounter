require 'spec_helper'

describe UsersController do
  describe "GET #show" do
    before :each do 
      @user =  FactoryGirl.create(:user)
      get :show, id: @user, format: :json
    end

    it("assigns @user") { assigns(:user).should == @user }
  end
end
