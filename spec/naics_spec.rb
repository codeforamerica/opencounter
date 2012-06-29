require File.dirname(__FILE__) + '/spec_helper'

describe "Naics" do
  include Rack::Test::Methods

  def app
    @app ||= Sinatra::Application
  end

  it "should return results" do
    @results = Naics.relevant_search("yoga")
    @results.should_not be_empty
  end

  it "should ignore case" do
    @cap = Naics.relevant_search("Yoga")
    @lower = Naics.relevant_search("yoga")
    @cap[0].should == @lower[0]
  end

  it "should filter results by a categorical description" do
    @results = Naics.relevant_search("pizza", 72)
    @old = Naics.relevant_search("pizza")
    @results.should_not eq(@old)
  end

  it "should search phrases" do
    @results = Naics.relevant_search("yoga studio")
    @results.should_not be_empty
  end


end


