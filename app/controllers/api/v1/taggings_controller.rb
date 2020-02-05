class Api::V1::TaggingsController < ApplicationController
	def destroy
		tagging=Tagging.find(params[:id])
		tagging.destroy
	end
	def index
		if params[:task_id]
			taggings= Task.find(:task_id).taggings
		else
			taggings=Tagging.all
		end
		render json: taggings
	end
end
