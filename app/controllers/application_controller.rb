class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :fake_load
  skip_before_action :verify_authenticity_token

  helper_method :login!, :current_user

  def login!
      session[:user_id] = @user.id
  end

  def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def fake_load
    sleep(1)
  end
end
