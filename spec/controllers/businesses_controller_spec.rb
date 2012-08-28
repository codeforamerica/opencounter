require 'spec_helper'

describe BusinessesController do

  describe "#create" do
    let(:name){
      "test biz"
    }
    let(:desc){
      "test biz"
    }
    let(:business){
      {:name => name, :description => desc}
    }

    
    it "creates a business" do
      post :create, :business=> business, :format => :json

      response.code.should == '201'
      resp_json = JSON.parse response.body
      p resp_json

      resp_json["name"].should == name
      resp_json["description"].should == desc
      
      
    end
    it "saves in the db" do

      count = Business.count
      
      post :create, :business=> business, :format => :json

      Business.count.should > count
      
    end
  end
end
