class BusinessesController < ApplicationController
  respond_to :json
  
#   # GET /business/new
#   def create
#     @biz = Business.create(params[:business])
#     respond_with @biz
#   end

#   # PUT /business/1
#   # PUT /business/1.json
#   # Expected structure: 
#   # {"business": {"name": "value"}, "answers": { "key": "value", "key": "value"}}

#   # TODO: change structure over to nested, make sure to copy params after pulling out answers so @biz.update_attrs doesn't fail
#   # OR push everything to biz and override the business.answers setter if rails does that
#   def update
#     @biz = Business.find(params[:id])
#     errors = [] 
#     errors << @biz.save_answers(params[:business][:answers]) if params[:business][:answers]
#     errors << @biz.update_attributes(params[:business]) if params[:business]

#     respond_to do |format|
#       if errors.empty?
# #        format.html { redirect_to @biz, notice: 'Business was successfully updated.' }
#         format.json { head :no_content }
#       else
# #        format.html { render action: "edit" }
#         format.json { render json: @biz.errors, status: :unprocessable_entity }
#       end
#     end

#   end
end
