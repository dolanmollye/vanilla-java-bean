class CreateDrinkIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :drink_ingredients do |t|
      t.belongs_to :drink, null: false, foreign_key: true
      t.belongs_to :ingredient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
