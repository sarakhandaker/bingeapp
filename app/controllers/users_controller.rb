class UsersController < ApplicationController
      def show
        user = User.find(params[:id])

        render json: user.to_json(:include => {
            :shows => {:only => [:title]}
          }, :except => [:updated_at])
      end

      def create
        # {
        #     "username": "sara",
        #     "location": "seattle"
        # }
        user=User.create(user_params)
        user.update(score: 0)
        render json: user, only: [:name]
      end

      def destroy
        user = user.find(params[:id])
        user.destroy
      end

      def user_params
        params.require(:user).permit(:username, :location)
      end

end
