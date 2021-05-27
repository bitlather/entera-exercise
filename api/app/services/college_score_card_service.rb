require 'net/http'
require 'uri'

class CollegeScoreCardService
  def get_school_id_name_lat_long_where_name_like(name_search)
    # Do search through rails backend to keep external API key hidden.
    # We could also cache results to reduce external api calls.
    api_key = Rails.application.secrets.college_score_card_api_key
    name_search = ERB::Util.url_encode(name_search)

    uri = URI.parse("https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=#{api_key}&school.name=#{name_search}&fields=id,school.name,location")

    request = Net::HTTP::Get.new(uri)

    response = Net::HTTP.start(uri.hostname, uri.port, { use_ssl: uri.scheme == "https" }) do |http|
      http.request(request)
    end

    unless response.code.to_s == '200'
      return nil
    end

    JSON.parse(response.body)
  end
end
