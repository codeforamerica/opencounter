require 'sinatra'
set :haml, :format => :html5
set :root, File.dirname(__FILE__)

get '/' do
  haml :index
end
