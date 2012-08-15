require 'spec_helper'

describe FieldAnswersController do
  describe "GET #show" do
    before :each do
      @field_answer = FactoryGirl.create(:field_answer)
      get :show, id: @field_answer, format: :json
    end

    it("assigns @field_answer"){ assigns(:field_answer).should == @field_answer }
  end
end
