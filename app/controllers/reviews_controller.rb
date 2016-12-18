class ReviewsController < ApplicationController
  before_action :authenticate_user!

  def create
    @movie = MovieBuilder.new(imdbid: params[:imdbid]).build!

    @review = current_user.reviews.new(review_params.merge(movie: @movie))

    if @review.save
      flash[:success] = "Review saved!"
      redirect_to movie_path(@movie)
    else
      flash[:alert] = "Woops! It seems there was an error."
      redirect_to root_path
    end

  end

  private

  def review_params
    params.require(:review).permit(:comment)
  end
end
