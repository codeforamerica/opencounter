class UsersController < ApplicationController
  respond_to :html, :json, :xml

  def show
    @user = User.find(params[:id])
    respond_with @user
  end

  def create
    @user = User.new(first_name => params[:firstname], last_name => params[:lastname], email => params[:email])
    respond_with @user
  end

  def edit
    @user = User.update(params[:id], params)
    respond_with @user
  end
end
