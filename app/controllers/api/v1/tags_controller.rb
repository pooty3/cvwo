class Api::V1::TagsController < ApplicationController

	def index
		render json: Tag.all
	end
	def create
		tag=Tag.create(tag_params)
		render json: tag
	end
	def destroy
		tag=Tag.find(params[:id])
		tag.taggings.each do |t|
			t.destroy
		end
		tag.destroy
	end
	def show
		tag = Tag.find(params[:id])
		rendeer json: tag
	end
	private
	def tag_params
		params.require(:tag).permit(:name)
	end
end
