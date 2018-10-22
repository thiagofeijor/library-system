class User < ActiveRecord::Base
    # encrypt password
    has_secure_password

    # Validations
    validates_presence_of :name, :email, :password_digest
end
