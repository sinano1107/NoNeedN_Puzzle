Rails.application.routes.draw do
  get "/" => "move#top"
  get "move/n_input"
  get "move/input_data/:n" => "move#input_data"
  get "move/capture/:truth/:lies/:n" => "move#capture"
  get "move/make/:n" => "move#make"
  get "move/n_input_make" => "move#n_input_make"

  post "processing/input_n"
  post "processing/input_n_make"
  post "processing/capture_preparation/:n" => "processing#capture_preparation"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
