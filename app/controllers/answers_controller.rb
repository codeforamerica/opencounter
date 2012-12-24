class AnswersController < InheritedResources::Base
  respond_to :html, :json, :xml

  def index
    if current_user
      @answers = current_user.current_business.answers
    end
    respond_with @answers
  end

  def create
    @answer = Answer.new(params[:answer])
    if current_user
      @answer.business = current_user.current_business  
    else
      # you can't save an answer without a user, so no current_user means there is a problem
      render({}, status: 500)
    end
    create!
  end

  def update
    @answer = Answer.find(params[:id])
    @answer.update_attribute(:value, params[:answer][:value])
    if current_user
      @answer.business = current_user.current_business
    else
      # you can't save an answer without a user, so no current_user means there is a problem
      render({}, status: 500)
    end
    @answer.save
    respond_with @answer
    # render :json => @answer
  end
end
