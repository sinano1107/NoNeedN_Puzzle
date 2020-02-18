class ProcessingController < ApplicationController

  def input_n
    redirect_to("/move/input_data/#{params[:n]}")
  end

  def input_n_make
    redirect_to("/move/make/#{params[:n]}")
  end

  def capture_preparation
    n = params[:n].to_i
    truth = []
    lies = []
    answer = []

    for x in 0..(n-1) do
      for y in 0..(n-1) do
        for num in 0..2 do
          data = [x.to_s,y.to_s]
          data.insert(num,"nil")
          data = data.join("_")

          if params[:"#{data}"] == "◯" then
            truth.append(data)
          elsif params[:"#{data}"] == "×"  then
            lies.append(data)
          end
        end
      end
    end

    redirect_to("/move/capture/#{truth}/#{lies}/#{n}")
  end

end
