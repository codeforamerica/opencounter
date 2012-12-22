class RequirementsController < ApplicationController
  
  def index
    cic_code = params[:cic]
    if cic_code
      requirements = CicCode.find_by_code(cic_code).requirements
    else
      requirements = Requirement.all.order('name')
    end
    render :json => requirements
  end
  
  def show
    requirement = Requirement.find(params[:id])
    render :json => requirement
  end

end
