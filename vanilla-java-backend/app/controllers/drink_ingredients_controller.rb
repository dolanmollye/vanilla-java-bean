class DrinkIngredientsController < ApplicationController
    
    def index
        dis = DrinkIngredient.all
        render json: dis
    end

    def create
        di = DrinkIngredient.create(drink_params)
        render json: di
    end

    def show 
        di = DrinkIngredient.where(ingredient_id: params[:id])
        render json: di
    end

    def destroy
        DrinkIngredient.find(params[:id]).destroy
    end 


    private

    def drink_params 
        params.require('drink_ingredient').permit('drink_id','ingredient_id')
    end 

end
