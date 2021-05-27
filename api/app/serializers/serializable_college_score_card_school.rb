class SerializableCollegeScoreCardSchool < JSONAPI::Serializable::Resource
  type 'college_score_card_school'
  attributes :id, :name, :latitude, :longitude
end