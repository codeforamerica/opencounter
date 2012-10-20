require 'csv'
desc "Import SIC Codes from /app/assets/csv/sic_codes.csv"
namespace :import do
  task :sic_codes => :environment do
    counter = 0
    CSV.foreach("#{Rails.root}/app/assets/csv/sic_codes.csv", :headers => false) do |row|
      unless row[0].blank?
        counter += 1
        SicCode.create(:code => row[0], :industry => row[1], :subindustry => row[2])
      end
    end
    puts "#{counter} SIC Codes imported"
  end
end