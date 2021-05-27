module Api
  module V1
    class CollegeController < BaseController
      def search
        service = CollegeScoreCardService.new
        data = service.get_school_id_name_lat_long_where_name_like params['name']

        return render nothing: true, status: :gateway_timeout if data.nil?

        schools = []
        data['results'].each_with_index do |v, i|
          school = CollegeScoreCardSchool.new({
            id: v['id'],
            name: v['school.name'],
            latitude: v['location.lat'],
            longitude: v['location.lon']
          })
          schools.push school if school.validate
        end

        render jsonapi: schools, status: :ok
      end
    end
  end
end
