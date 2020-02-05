# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Tag.create(name: "Tag1")
Tag.create(name: "Tag2")
Tag.create(name: "Tag3")

Task.create(title: "Task1", description: "Do this", tag_ids: [1,3])
Task.create(title: "Task2", description: "Do this 2", tag_ids: [1,2])
Task.create(title: "Task2", description: "Do this 2", tag_ids: [1,2,3])
