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
end
