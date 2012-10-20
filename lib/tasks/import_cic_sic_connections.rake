require 'csv'
desc "Connect CIC and SIC Codes from /app/assets/csv/zoning_and_sic_codes.csv"
namespace :import do
  task :cic_sic_connections => :environment do
    counter = 0
    CSV.foreach("#{Rails.root}/app/assets/csv/zoning_and_sic_codes.csv", :headers => false) do |row|
      unless row[0].blank?
        counter += 1
        cic_code = CicCode.find_by_code(row[2])
        sic_code = SicCode.find_by_code(row[6])
        if cic_code.present? && sic_code.present?      
          cic_code.sic_codes << sic_code
        end
      end
    end
    puts "#{counter} CIC and SIC Codes connected"
  end
end