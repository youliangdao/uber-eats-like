class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  skip_before_action :verify_authenticity_token, raise: false

  helper_method :login!, :current_user

  def login!
      session[:user_id] = @user.id
  end

  def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

end
