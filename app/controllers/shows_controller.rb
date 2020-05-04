class ShowsController < ApplicationController
    
    def show
        show = Show.find(params[:id])
        render json: show.to_json(:include => [:episodes], :except => [:updated_at])
    end 

    def create
    end

end
