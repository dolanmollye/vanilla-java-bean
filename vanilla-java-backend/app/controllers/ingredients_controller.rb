class IngredientsController < ApplicationController
    def index
        ingredients = Ingredient.all
        render json: ingredients
    end

    def create
        ingredient = Ingredient.find_or_create_by(name: params[:name])
        render json: ingredient
    end
end
