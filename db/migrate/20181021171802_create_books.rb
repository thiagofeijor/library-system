class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :description
      t.string :cover
      t.string :author
      t.string :created_by

      t.timestamps null: false
    end
  end
end
