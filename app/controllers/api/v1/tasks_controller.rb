class Api::V1::TasksController < ApplicationController

	def create
		task= Task.create(task_params)
		render json: task
	end

	def index
		render json: Task.all
	end

	def update
		task=Task.find(params[:id])
		task.update(task_params)
		render json: task
	end
	def destroy
		task=Task.find(params[:id])
		task.taggings.each do |t|
			t.destroy
		end
		task.destroy

	end
	private
  def task_params
    params.require(:task).permit(:title, :description, :tag_ids=>[])
  end
end
