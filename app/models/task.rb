class Task < ApplicationRecord
	validates :title, presence: true
	has_many :taggings
	has_many :tags, through: :taggings
end
