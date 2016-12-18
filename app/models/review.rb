class Review < ApplicationRecord
  validates :user, :movie, :comment
  belongs_to :user
  belongs_to :movie
end
