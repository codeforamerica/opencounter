class FieldAnswersController < InheritedResources::Base
  respond_to :html, :json, :xml

  belongs_to :field, :user
end
