class EpisodesController < ApplicationController
    
    def show
        # fetch(`http://localhost:3000/episodes/${show.id}`)

        current_show=Show.find(params[:id])
        episodes=current_show.episodes
        render json: episodes
    end 

end
