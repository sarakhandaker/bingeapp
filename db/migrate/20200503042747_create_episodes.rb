class CreateEpisodes < ActiveRecord::Migration[6.0]
  def change
    create_table :episodes do |t|
      t.integer :show_id
      t.integer :season
      t.integer :number
      t.string :name

      t.timestamps
    end
  end
end
