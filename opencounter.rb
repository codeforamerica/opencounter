require 'rubygems'
require 'sinatra'
require 'data_mapper'

require 'models/naics.rb'
require 'models/sic.rb'
DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, ENV['DATABASE_URL'])

set :root, File.dirname(__FILE__)
set :public_folder, 'public'
enable :static

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/code-search' do
  @naics = Naics.all(:description.like => "%#{params[:query]}%") |
    Naics.all
  @sic = Sic.all
  erb :codes
end

