# frozen_string_literal: true

include ApplicationHelper

class ApplicationHelperTest < ActionDispatch::IntegrationTest
  def setup
    @base_title = 'Ruby on Rails Tutorial Sample App'
  end

  test 'returns_base_title_only' do
    expected = @base_title

    actual = ApplicationHelper.full_title

    assert_equal(expected, actual)
  end

  test 'returns_page_with_base_title' do
    expected = "hogehoge | #{@base_title}"

    actual = ApplicationHelper.full_title('hogehoge')

    assert_equal(expected, actual)
  end
end
