class Review < ApplicationRecord
  validates :user, :movie, :comment, presence: true
  belongs_to :user
  belongs_to :movie

  delegate :photo, :name, to: :user, prefix: true
end
