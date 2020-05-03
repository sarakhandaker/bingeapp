class EpisodesController < ApplicationController
    
    def show
        # fetch(`http://localhost:3000/episodes/${object.show.id}`)
        show_api_id=params[:id]
        current_show=Show.find_by(api_id: show_api_id)
        episodes=current_show.episodes
        render json: episodes
    end 

end
