class Episode < ApplicationRecord
    belongs_to :show, optional: true
    has_many :user_episodes
end
