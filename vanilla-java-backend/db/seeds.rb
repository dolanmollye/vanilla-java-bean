# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

DrinkIngredient.destroy_all
Drink.destroy_all
Ingredient.destroy_all

ingredients = [
    {name: 'Whole Milk'},
    {name: '2% Milk'},
    {name: 'Nonfat Milk'},
    {name: 'Oatmilk'},
    {name: 'Hempmilk'},
    {name: 'Almond Milk'},
    {name: 'Cashew Milk'},
    {name: 'Rice Milk'},
    {name: 'Soy Milk'},
    {name: 'Coconut Milk'},
    {name: 'Chocolate Sauce'},
    {name: 'Caramel Sauce'},
    {name: 'White Chocolate Sauce'},
    {name: 'Vanilla Syrup'},
    {name: 'Almond Syrup'},
    {name: 'Hazelnut Syrup'},
    {name: 'Coconut Syrup'},
    {name: 'Crème De Menthe Syrup'},
    {name: 'English Toffee'},
    {name: 'Irish Creme'},
    {name: 'Lavendar'},
]

ingredients.each {|ingredient| Ingredient.create(ingredient)}