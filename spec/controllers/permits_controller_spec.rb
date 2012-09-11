require 'spec_helper'

describe PermitsController do
  describe "GET #show" do
    context "when zoning exists" do
      let(:sic) { "1234" }
      let(:zoning) { "R-S" }

      it "returns the permit" do
        get :show, :sic => sic, :zoning => zoning
        response.code.should == '200'

        parsed_response = JSON.parse(response.body)
        parsed_response["permit"].should == 'zoning clearance'
      end
    end

    context "when zoning does not exist" do
      let(:sic) {"0000"}
      let(:zoning) {"R-S"}

      it "returns unkonwn" do
        get :show, :sic => sic, :zoning => zoning
        response.code.should == '200'
        parsed_response = JSON.parse(response.body)
        parsed_response["permit"].should == 'unknown'
      end

    end
    context "when zoning does not exist" do
      let(:sic) {"1234"}
      let(:zoning) {"JLKASD"} # <- not valid zone

      it "returns unkonwn" do
        get :show, :sic => sic, :zoning => zoning
        response.code.should == '200'
        parsed_response = JSON.parse(response.body)
        parsed_response["permit"].should == 'unknown'
      end

    end

    context "when zoning is explicitly unknown" do
      let(:sic) {"5555"}
      let(:zoning) {"R-S"}

      it "returns unkonwn" do
        get :show, :sic => sic, :zoning => zoning
        response.code.should == '200'
        parsed_response = JSON.parse(response.body)
        parsed_response["permit"].should == 'unknown'
      end
    end

    context "when sic falls within a range" do
      let(:sic) {"5025"}
      let(:zoning) {"R-S"}

      it "returns prohibited" do
        get :show, :sic => sic, :zoning => zoning
        response.code.should == '200'
        parsed_response = JSON.parse(response.body)
        parsed_response["permit"].should == 'prohibited'
      end

    end
  end
end
