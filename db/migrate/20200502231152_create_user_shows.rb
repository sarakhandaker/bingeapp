class CreateUserShows < ActiveRecord::Migration[6.0]
  def change
    create_table :user_shows do |t|
      t.integer :show_id
      t.integer :user_id

      t.timestamps
    end
  end
end
