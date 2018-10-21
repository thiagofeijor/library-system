class User < ActiveRecord::Base
    # encrypt password
    has_secure_password

    # Model associations
    has_many :books, foreign_key: :created_by
    # Validations
    validates_presence_of :name, :email, :password_digest
end
