class Book < ActiveRecord::Base
    # validations
    validates_presence_of :title, :description, :cover, :author, :created_by
end
