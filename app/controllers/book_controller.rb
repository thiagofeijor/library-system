class BookController < ApplicationController
    skip_before_action :authorize_request, only: [:index, :show]
    before_action :set_book, only: [:show, :update, :destroy]

    # GET /book
    def index
      if (params[:query]) 
        @books = Book.where(["title like ? or description like ? or author like ?", "%#{params[:query]}%", "%#{params[:query]}%", "%#{params[:query]}%"])
      else 
        @books = Book.all
      end

      if (params[:sort]) 
        sort = params[:sort] == "asc" ? :asc : :desc;
        @books = @books.order(title: sort)
      end

      json_response(@books)
    end
  
    # POST /book
    def create
      @book = Book.create!(book_params)
      json_response(@book, :created)
    end
  
    # GET /book/:id
    def show
      json_response(@book)
    end
  
    # PUT /book/:id
    def update
      @book.update(book_params)
      head :no_content
    end
  
    # DELETE /book/:id
    def destroy
      @book.destroy
      head :no_content
    end
  
    private
  
    def book_params
      # whitelist params
      params.permit(:title, :description, :cover, :author)
    end
  
    def set_book
      @book = Book.find(params[:id])
    end
end
