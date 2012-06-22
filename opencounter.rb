require 'rubygems'
require 'sinatra'
require 'sinatra/activerecord'


require './lib/models/naics.rb'
set :root, File.dirname(__FILE__)
set :public_folder, 'public'
enable :static

db = URI.parse(ENV['DATABASE_URL'])

ActiveRecord::Base.establish_connection(
  :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
  :host     => db.host,
  :port     => db.port,
  :username => db.user,
  :password => db.password,
  :database => db.path[1..-1],
  :encoding => 'utf8'
  )

get '/' do
  File.read(File.join('public', 'app.html'))
end

get '/code-search' do
  erb :codes
end

post '/code-search' do
  term = params[:query].downcase
  @naics = Naics.relevant_search("#{params[:query]}")
  erb :codes
end
