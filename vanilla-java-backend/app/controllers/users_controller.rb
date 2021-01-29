class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end
    
    def create
        user = User.find_or_create_by(name: params[:name])
        newDrink = Drink.create(name: "", user_id: user.id)
        render json: [user, newDrink]
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render json: user
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        render json: user
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end
end
