FactoryBot.define do
    factory :book do
      title { Faker::Lorem.word }
      description { Faker::Lorem.word }
      cover { Faker::Lorem.word }
      author { Faker::Lorem.word }
      created_by { Faker::Number.number(10) }
    end
end