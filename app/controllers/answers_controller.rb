class AnswersController < InheritedResources::Base
  respond_to :html, :json, :xml

  def create
    @answer = Answer.new()
    @answer.value = params[:answer][:value]
    @answer.field = Field.where(:name => params[:answer][:name]).first
    @answer.user = current_user
    create!
  end

  def update
    @answer = Answer.new(params[:answer])
    @answer.field = Field.where(:name => params[:answer][:name]).first
    @answer.user = current_user
    update!
  end
end
