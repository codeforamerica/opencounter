class Admin::ApplicationsController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!

  def index
    # An application is defined as the collection of answers for a given user.
    # TODO: class? activerecord model?
    @applications = User.all.map{ |u| [u,u.answers] }
  end

  def show
  end

end


# Lifted from Facets

