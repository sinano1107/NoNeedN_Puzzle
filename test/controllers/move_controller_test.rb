require 'test_helper'

class MoveControllerTest < ActionDispatch::IntegrationTest
  test "should get top" do
    get move_top_url
    assert_response :success
  end

end
