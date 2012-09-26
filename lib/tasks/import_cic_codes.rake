require 'csv'
desc "Import Business Codes from /app/assets/csv/cic_codes.csv"
namespace :import do
  task :cic_codes => :environment do
    counter = 0
    CSV.foreach("#{Rails.root}/app/assets/csv/cic_codes.csv", :headers => false) do |row|
      unless row[0].blank?
        counter += 1
        unless counter == 1
          CicCode.create(:code => row[0], :industry => row[1], :subindustry => row[2])
        end
      end
    end
    puts "#{counter} CIC Codes imported"
  end
end