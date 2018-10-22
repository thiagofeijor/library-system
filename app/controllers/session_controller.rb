class SessionController < ApplicationController

  def session
    if headers['Authorization'].present?
      head :no_content
    end
      head :no_content
  end

end
