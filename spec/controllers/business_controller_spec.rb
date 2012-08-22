require 'spec_helper'

describe BusinessController do

  before(:each) do
    @biz = FactoryGirl.create(:business)
  end

  describe "#create" do
    it "creates a poll" do
      post :create, :business=> FactoryGirl.attributes_for(:business)
      assigns[:business].should_not be_nil
    end
  end
end
