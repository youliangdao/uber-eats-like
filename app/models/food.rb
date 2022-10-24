class Food < ApplicationRecord
  has_one :line_food
  belogns_to :restaurant

end
