require 'rails_helper'

RSpec.describe 'Books API', type: :request do
  # initialize test data 
  let(:user) { create(:user) }
  let!(:books) { create_list(:book, 10) }
  let(:book_id) { books.first.id }

  # authorize request
  let(:headers) { valid_headers }

  # Test suite for GET /book
  describe 'GET /book' do
    # make HTTP get request before each example
    before { get '/book', params: {}, headers: headers }

    it 'returns books' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /book/:id
  describe 'GET /book/:id' do
    before { get "/book/#{book_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the book' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(book_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:book_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Book/)
      end
    end
  end

  # Test suite for POST /book
  describe 'POST /book' do
    let(:valid_attributes) do
        { title: 'Rails', description: 'book', cover: "me", author: 'me', created_by: user.id.to_s }
    end

    context 'when the request is valid' do
      before { post '/book', valid_attributes, headers: headers, as: :json }

      it 'creates a book' do
        expect(json['title']).to eq('Rails')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:invalid_attributes) { { title: nil } }
      before { post '/book', invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Created by can't be blank/)
      end
    end
  end

  # Test suite for PUT /book/:id
  describe 'PUT /book/:id' do
    let(:valid_attributes) { { title: 'Shopping' } }

    context 'when the record exists' do
      before { put "/book/#{book_id}", valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /book/:id
  describe 'DELETE /book/:id' do
    before { delete "/book/#{book_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end