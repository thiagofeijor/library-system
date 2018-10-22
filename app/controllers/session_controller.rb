class SessionController < ApplicationController

  def check
    # Check if you have a current user
    if (@current_user) 
      head 200
    else
      head 401
    end
  end

end
