class FieldAnswersController < InheritedResources::Base
  respond_to :html, :json, :xml

  def create
    @field_answer = FieldAnswer.new(params[:field_answer])
    @field_answer.field = Field.where(:key => params[:field_key])
    @field_answer.user = current_user
    create!
  end

  def update
    @field_answer = FieldAnswer.new(params[:field_answer])
    @field_answer.field = Field.where(:key => params[:field_key])
    @field_answer.user = current_user
    update!
  end
end
