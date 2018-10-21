require 'rails_helper'

# Test suite for the Book model
RSpec.describe Book, type: :model do
  # Validation tests
  # ensure columns title, description, cover, author and created_by are present before saving
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:cover) }
  it { should validate_presence_of(:author) }
  it { should validate_presence_of(:created_by) }
end