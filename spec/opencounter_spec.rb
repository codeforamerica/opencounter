require File.dirname(__FILE__) + '/spec_helper'

describe "Application", :type => :request do
  include Rack::Test::Methods

  def app
    @app ||= Sinatra::Application
  end

  it "should display the welcome on the home page" do
    get '/'
    last_response.body.should have_content('Guide!')
  end
end
