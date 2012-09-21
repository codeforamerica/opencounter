class AnswersController < InheritedResources::Base
  respond_to :html, :json, :xml

  def create
    @answer = Answer.new()
    @answer.value = params[:answer][:value]
    @answer.field = Field.find_or_create_by_name(params[:answer][:field_name])
    if current_user
      @answer.business = current_user.businesses.first
    end
    p @answer
    create!
  end

  def update
    @answer = Answer.new(params[:answer])
    @answer.field = Field.find_or_create_by_name(:name => params[:answer][:field_name])
    @answer.user = current_user
    update!
  end
end
