class UsersController < ApplicationController
  respond_to :html, :json, :xml

  def show
    @user = User.find(params[:id])
    respond_with @user
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      respond_with @user
    else
      #something went wrong
    end
  end

  def edit

  end
end
