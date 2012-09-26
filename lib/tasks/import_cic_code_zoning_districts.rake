require 'csv'
desc "Connect CIC Codes to Zoning Districts /app/assets/csv/cic_codes_and_zoning_districts.csv"
namespace :import do
  task :cic_code_zoning_districts => :environment do
    @connections = 0
    def create_mappings(zoning_district_id, cic_codes, permission_type)
      if cic_codes.present?
        cic_codes.each do |cic_code|
          cic = CicCode.find_by_code(cic_code.try(:strip).try(:upcase))
          if cic.present?
            connector = CicCodeZoningDistrict.find_or_create_by_cic_code_id_and_zoning_district_id(cic.id, zoning_district_id)
            connector.update_attribute(:permission, permission_type)
            @connections += 1
          end
        end
      end
    end
    
    counter = 0
    CSV.foreach("#{Rails.root}/app/assets/csv/cic_codes_and_zoning_districts.csv", :headers => false) do |row|
      unless row[0].blank?
        counter += 1
        unless counter == 1
          zoning_district = ZoningDistrict.find_by_code(row[0])
          if zoning_district.present?
            permitted_cics      = row[1].try(:split, ', ')
            permitted_aup_cics  = row[2].try(:split, ', ')
            permitted_sup_cics  = row[3].try(:split, ', ')
            prohibited_cics     = row[4].try(:split, ', ')
            unknown_cics        = row[5].try(:split, ', ')
          
            create_mappings(zoning_district.id, permitted_cics, 1)
            create_mappings(zoning_district.id, permitted_aup_cics, 2)
            create_mappings(zoning_district.id, permitted_sup_cics, 3)
            create_mappings(zoning_district.id, prohibited_cics, 4)
            create_mappings(zoning_district.id, unknown_cics, 5)
          
          end
        end
      end
    end
    puts "#{@connections} CIC Code / Zoning District connections"
  end
end