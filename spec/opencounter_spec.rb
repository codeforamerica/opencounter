require File.dirname(__FILE__) + '/spec_helper'

describe "Application", :type => :request do
  include Rack::Test::Methods

  def app
    @app ||= Sinatra::Application
  end

  it "should respond to a root request" do
    get '/'
    last_response.should be_ok
  end

  it "should display the welcome on the home page" do
    get '/'
    last_response.body.should have_content('Guide!')
  end

  it "should return search results" do
    visit '/code-search'
    page.should have_content('What type of business?')
    fill_in 'query', :with => 'yoga'
  end
end
