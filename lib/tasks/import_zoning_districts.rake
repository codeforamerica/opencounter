require 'csv'
desc "Import Zoning Districts /app/assets/csv/zoning_districts.csv"
namespace :import do
  task :zoning_districts => :environment do
    counter = 0
    CSV.foreach("#{Rails.root}/app/assets/csv/zoning_districts.csv", :headers => false) do |row|
      unless row[0].blank?
        counter += 1
        unless counter == 1
          zd = ZoningDistrict.create(:code => row[0], :name => row[1], :description => row[2])
          zd.update_attribute(:home_occ_prohibited, true) if row[3] == 'Y'
        end
      end
    end
    puts "#{counter} Zoning Districts imported"
  end
end