class AnswersController < InheritedResources::Base
  respond_to :html, :json, :xml

  def create
    @answer = Answer.new()
    @answer.text = params[:answer][:value]
    @answer.field = Field.where(:key => params[:answer][:name]).first
    create!
  end

  def update
    @answer = Answer.new(params[:answer])
    @answer.field = Field.where(:key => params[:field_key])
    @answer.user = current_user
    update!
  end
end
