class DrinksController < ApplicationController
    def index
     drinks = Drink.all
     render json: drinks
    end

    def create
        drink = Drink.create(name: params[:name], user_id: params[:id])
        render json: drink
    end
end
