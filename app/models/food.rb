class Food < ApplicationRecord
  has_one :line_food
  belongs_to :restaurant

end
