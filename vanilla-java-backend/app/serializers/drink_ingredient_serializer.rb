class DrinkIngredientSerializer < ActiveModel::Serializer
  attributes :id
  has_one :drink
  has_one :ingredient
end
