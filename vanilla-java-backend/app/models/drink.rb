class Drink < ApplicationRecord
  has_many :drink_ingredients, dependent: :destroy
  has_many :ingredients, through: :drink_ingredients
  belongs_to :user
end
