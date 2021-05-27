class CollegeScoreCardSchool

  include ActiveModel::Model
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :id
  attr_accessor :name
  attr_accessor :latitude
  attr_accessor :longitude

  validates :id, :presence => true
  validates :latitude, :presence => true
  validates :longitude, :presence => true
  validates :name, :presence => true

  def persisted?
    # This model is not associated with the database.
    false
  end

end