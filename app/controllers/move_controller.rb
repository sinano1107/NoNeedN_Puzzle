class MoveController < ApplicationController
  def top
  end

  def n_input
  end

  def n_input_make
  end

  def input_data
    @n = params[:n]
  end

  def capture
    @n = params[:n]
    @truth = params[:truth]
    @lies = params[:lies]
  end

  def make
    @n = params[:n]
  end
end
