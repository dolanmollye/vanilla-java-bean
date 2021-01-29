class User < ApplicationRecord
    has_many :drinks, dependent: :destroy
end
