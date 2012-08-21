class BusinessController < ApplicationController
  def create
    @biz = Business.new(params[:business])
    respond_to do |format|
      if @biz.save
        #format.html { redirect_to @biz, notice: 'Business was successfully created.' }
        format.json { render json: @biz, status: :created, location: @biz }
      else
        #format.html { render action: "new" }
        format.json { render json: @biz.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /business/1
  # PUT /business/1.json
  def update
    @biz = Business.find(params[:id])

    respond_to do |format|
      if @biz.update_attributes(params[:business])
#        format.html { redirect_to @biz, notice: 'Business was successfully updated.' }
        format.json { head :no_content }
      else
#        format.html { render action: "edit" }
        format.json { render json: @biz.errors, status: :unprocessable_entity }
      end
    end

  end
end
