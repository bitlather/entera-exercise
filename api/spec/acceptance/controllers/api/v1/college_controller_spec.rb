require 'rails_helper'
require 'rspec_api_documentation/dsl'
 
resource 'College' do
 
  explanation "Working with college data from the external CollegeScoreCard API."
 
  before(:each) do
    header 'Content-Type', 'application/json'
  end

  get '/api/v1/college/search?name=:name' do

    parameter :name, "College search string.", required: true

    let (:name) { 'new york' }

    describe 'admin' do
      before { 
        allow_any_instance_of(CollegeScoreCardService).to receive(:get_school_id_name_lat_long_where_name_like).and_return(
          {
            "metadata"=>{"page"=>0, "total"=>2, "per_page"=>20},
            "results"=>
            [{"school.name"=>"DeVry College of New York",
              "id"=>482413,
              "location.lat"=>40.747747,
              "location.lon"=>-73.983492},
              {"school.name"=>"New York College of Podiatric Medicine",
              "id"=>194073,
              "location.lat"=>40.805037,
              "location.lon"=>-73.940496}]
          }
        )
      }

      example_request 'Search (200)' do
        expect(status).to eq(200)

        response = JSON.parse(response_body)
        expect(response['data'].length).to eq(2)

        expect(response['data'][0]).to eq({
          "id"=>"482413",
          "type"=>"college_score_card_school",
          "attributes"=>
          {
            "id"=>482413,
            "name"=>"DeVry College of New York",
            "latitude"=>40.747747,
            "longitude"=>-73.983492
          }
        })

        expect(response['data'][1]).to eq({
          "id"=>"194073",
          "type"=>"college_score_card_school",
          "attributes"=>
          {
            "id"=>194073,
            "name"=>"New York College of Podiatric Medicine",
            "latitude"=>40.805037,
            "longitude"=>-73.940496
          }
        })
      end
    end
  end
end
