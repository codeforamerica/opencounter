require 'rubygems'
require 'sinatra'
require 'data_mapper'

DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, ENV['DATABASE_URL'])

set :haml, :format => :html5
set :root, File.dirname(__FILE__)
set :public_folder, 'public'
enable :static

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/code-search' do
  File.read(File.join('public', 'code-search.html'))
end

post '/code-search' do
end
