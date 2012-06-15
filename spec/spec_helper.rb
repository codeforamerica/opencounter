require 'rubygems'
require 'sinatra'
require 'test/unit'
require 'rack/test'
require 'capybara'
require 'capybara/dsl'


require File.join(File.dirname(__FILE__), '../lib', 'opencounter')
Capybara.app = Sinatra::Application

RSpec.configure do |config|
  config.include Capybara::DSL
end

set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false
