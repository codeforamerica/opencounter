require File.dirname(__FILE__) + '/spec_helper'

describe "Code-Search", :type => :request do
  include Rack::Test::Methods

  def app
    @app ||= Sinatra::Application
  end

  it "should display the code-search page" do
    get '/code-search'
    last_response.should be_ok
  end

  it "should present the description and industry options" do
    visit '/code-search'
    page.should have_content("What Industry are you entering?")
    page.should have_content("What type of business are you starting?")
  end

  it "should return results" do
    visit '/code-search'
    page.select 'Educational Services', :from => 'category'
    page.fill_in 'query', :with => 'yoga studio'
    page.click_button('Submit')
    page.should have_content('Yoga instruction, camps, or schools')
  end

end

