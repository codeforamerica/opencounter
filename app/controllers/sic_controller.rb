class SicController < ApplicationController
  def index
    @response = ['cool']

    render :json => @response
  end
end
