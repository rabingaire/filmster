class Review < ApplicationRecord
  validates :user, :movie, :comment, presence: true
  belongs_to :user
  belongs_to :movie
end
