FactoryBot.define do
    factory :book do
      title { Faker::Lorem.word }
      description { Faker::Lorem.word }
      cover { Faker::Lorem.word }
      author { Faker::Lorem.word }
    end
end