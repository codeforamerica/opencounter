require File.dirname(__FILE__) + '/spec_helper'

describe "Code-Search", :type => :request do
  include Rack::Test::Methods

  def app
    @app ||= Sinatra::Application
  end

  it "it should display the search page" do
    visit '/code-search'
    page.should have_content("What type of business?")
  end

  it "should return results" do
    visit '/code-search'
    fill_in 'query', :with => 'Yoga'
    click_on 'Submit'
    page.should have_content('NAICS Codes')
    page.should have_content('611699')
  end

end


