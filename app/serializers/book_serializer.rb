class BookSerializer < ActiveModel::Serializer
  # attributes to be serialized  
  attributes :id, :title, :description, :cover, :author
end
