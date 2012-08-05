# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "SEEDING: SANTA CRUZ FIELDS"

applicant_first_name            = Field.create(:name => "applicant_first_name",             :prompt => "Applicant First Name",                                :format => "text")
applicant_last_name             = Field.create(:name => "applicant_last_name",              :prompt => "Applicant Last Name",                                 :format => "text")
applicant_phone                 = Field.create(:name => "applicant_phone",                  :prompt => "Applicant Phone Number",                              :format => "text")
applicant_email                 = Field.create(:name => "applicant_email",                  :prompt => "Applicant Email",                                     :format => "text")
applicant_address_street        = Field.create(:name => "applicant_address_street",         :prompt => "Applicant Address (Street)",                          :format => "text")
applicant_address_detail        = Field.create(:name => "applicant_address_detail",         :prompt => "Applicant Address (Detail)",                          :format => "text")
applicant_address_city          = Field.create(:name => "applicant_address_city",           :prompt => "Applicant Address (City)",                            :format => "text")
applicant_address_state         = Field.create(:name => "applicant_address_state",          :prompt => "Applicant Address (State)",                           :format => "text")
applicant_address_zip           = Field.create(:name => "applicant_address_zip",            :prompt => "Applicant Address (Zip)",                             :format => "text")
applicant_ssn                   = Field.create(:name => "applicant_ssn",                    :prompt => "Applicant SSN",                                       :format => "text")
business_name                   = Field.create(:name => "business_name",                    :prompt => "Business Name",                                       :format => "text")
business_emergency_phone        = Field.create(:name => "business_emergency_phone",         :prompt => "Business Emergency Phone Number",                     :format => "text")
is_business_home_occ            = Field.create(:name => "is_business_home_occ",             :prompt => "Where will this business be located?",                :format => "text")
business_address_street         = Field.create(:name => "business_address_street",          :prompt => "Business Address (Street)",                           :format => "text")
business_address_detail         = Field.create(:name => "business_address_detail",          :prompt => "Business Address (Detail)",                           :format => "text")
business_address_city           = Field.create(:name => "business_address_city",            :prompt => "Business Address (City)",                             :format => "text")
business_address_state          = Field.create(:name => "business_address_state",           :prompt => "Business Address (State)",                            :format => "text")
business_address_zip            = Field.create(:name => "business_address_zip",             :prompt => "Business Address (Zip)",                              :format => "text")
business_phone                  = Field.create(:name => "business_phone",                   :prompt => "Business Phone #",                                    :format => "text")
apn                             = Field.create(:name => "apn",                              :prompt => "APN",                                                 :format => "text")
zoning_district                 = Field.create(:name => "zoning_district",                  :prompt => "Zoning District",                                     :format => "text")
intended_use                    = Field.create(:name => "intended_use",                     :prompt => "Intended Property Use",                               :format => "text")
prior_use                       = Field.create(:name => "prior_use",                        :prompt => "Previous Property Use",                               :format => "text")
date_of_occupancy               = Field.create(:name => "date_of_occupancy",                :prompt => "Date of Occupancy",                                   :format => "text")
total_area                      = Field.create(:name => "total_area",                       :prompt => "Total Area (square feet)",                            :format => "text")
first_floor_area                = Field.create(:name => "first_floor_area",                 :prompt => "First Floor Area",                                    :format => "text")
outdoor_area                    = Field.create(:name => "outdoor_area",                     :prompt => "Outdoor Area",                                        :format => "text")
single_or_multi_tenant          = Field.create(:name => "single_or_multi_tenant",           :prompt => "Single or Multi-Tenant?",                             :format => "text")
auto_parking_spaces             = Field.create(:name => "auto_parking_spaces",              :prompt => "Auto Parking Spaces",                                 :format => "text")
bicycle_parking_spaces          = Field.create(:name => "bicycle_parking_spaces",           :prompt => "Bicycle Parking Spaces",                              :format => "text")
business_additional_owners      = Field.create(:name => "business_additional_owners",       :prompt => "List additional owners w/ title, address, phone #*",  :format => "text")
number_of_rental_units          = Field.create(:name => "number_of_rental_units",           :prompt => "Number of rental units",                              :format => "text")
state_id                        = Field.create(:name => "state_id",                         :prompt => "State ID",                                            :format => "text")
state_sales_tax_id              = Field.create(:name => "state_sales_tax_id",               :prompt => "State Sales Tax #",                                   :format => "text")
fin_ein                         = Field.create(:name => "fin_ein",                          :prompt => "FIN/EIN",                                             :format => "text")
state_contractors_license       = Field.create(:name => "state_contractors_license",        :prompt => "State Contractor's License",                          :format => "text")
number_of_employees             = Field.create(:name => "number_of_employees",              :prompt => "Number of Employees",                                 :format => "text")
agent_name                      = Field.create(:name => "agent_name",                       :prompt => "Agent Name",                                          :format => "text")
agent_address                   = Field.create(:name => "agent_address",                    :prompt => "Agent Address",                                       :format => "text")
agent_phone                     = Field.create(:name => "agent_phone",                      :prompt => "Agent Phone #",                                       :format => "text")
current_date                    = Field.create(:name => "current_date",                     :prompt => "Current Date",                                        :format => "text")
owner_name                      = Field.create(:name => "owner_name",                       :prompt => "Owner Name*",                                         :format => "text")
owner_address                   = Field.create(:name => "owner_address",                    :prompt => "Owner Address*",                                      :format => "text")
owner_phone                     = Field.create(:name => "owner_phone",                      :prompt => "Owner Phone #*",                                      :format => "text")
permit_id                       = Field.create(:name => "permit_id",                        :prompt => "Permit #",                                            :format => "text")
date                            = Field.create(:name => "date",                             :prompt => "Date",                                                :format => "text")
expansion_plan_check_due_date   = Field.create(:name => "expansion_plan_check_due_date",    :prompt => "Expansion Plan Check Due Date",                       :format => "text")
square_footage_new              = Field.create(:name => "square_footage_new",               :prompt => "Sq. Footage (New, Addition, Tenant Improvement)",     :format => "text")
role_of_applicant               = Field.create(:name => "role_of_applicant",                :prompt => "Role of Applicant (Owner, Agent, Tenant)",            :format => "text")
role_of_professional            = Field.create(:name => "role_of_professional",             :prompt => "Professional's Role (Architect, Engineer, etc)",      :format => "text")
professional_name               = Field.create(:name => "professional_name",                :prompt => "Professional's Name",                                 :format => "text")
professional_address            = Field.create(:name => "professional_address",             :prompt => "Professional's Address",                              :format => "text")
professional_phone              = Field.create(:name => "professional_phone",               :prompt => "Professional's Phone #",                              :format => "text")
professional_email              = Field.create(:name => "professional_email",               :prompt => "Professional's Email",                                :format => "text")
contractor_license_num          = Field.create(:name => "contractor_license_num",           :prompt => "Contractor License #",                                :format => "text")
occupancy_class                 = Field.create(:name => "occupancy_class",                  :prompt => "Occupancy Class",                                     :format => "text")
type_of_construction            = Field.create(:name => "type_of_construction",             :prompt => "Type of Construction",                                :format => "text")
building_height_feet            = Field.create(:name => "building_height_feet",             :prompt => "Building Height (ft)",                                :format => "text")
building_height_stories         = Field.create(:name => "building_height_stories",          :prompt => "Building Height (stories)",                           :format => "text")
sprinklers                      = Field.create(:name => "sprinklers",                       :prompt => "Sprinklers?",                                         :format => "text")
is_quimby_fee                   = Field.create(:name => "is_quimby_fee",                    :prompt => "Quimby Fee?",                                         :format => "text")
is_tif_project                  = Field.create(:name => "is_tif_project",                   :prompt => "TIF project?",                                        :format => "text")
business_structure              = Field.create(:name => "business_structure",               :prompt => "What is your business's legal structure?",            :format => "text")
lot_size                        = Field.create(:name => "lot_size",                         :prompt => "Lot Size (sq. ft)",                                   :format => "text")
total_land_area                 = Field.create(:name => "total_land_area",                  :prompt => "Total Land Area (sq. ft)*",                           :format => "text")
proposed_floor_area             = Field.create(:name => "proposed_floor_area",              :prompt => "Proposed Floor Area (sq. ft)",                        :format => "text")
existing_floor_area             = Field.create(:name => "existing_floor_area",              :prompt => "Existing Floor Area (sq. ft)",                        :format => "text")
total_floor_area                = Field.create(:name => "total_floor_area",                 :prompt => "Total Floor Area (sq. ft)",                           :format => "text")
building_height                 = Field.create(:name => "building_height",                  :prompt => "Building Height (ft and stories)",                    :format => "text")
accessory_building_height       = Field.create(:name => "accessory_building_height",        :prompt => "Accessory Building Height (ft and stories)",          :format => "text")
auto_parking_breakdown          = Field.create(:name => "auto_parking_breakdown",           :prompt => "Auto Parking Breakdown",                              :format => "text")
bicycle_parking_breakdown       = Field.create(:name => "bicycle_parking_breakdown",        :prompt => "Bicycle Parking Breakdown",                           :format => "text")
wall_sign                       = Field.create(:name => "wall_sign",                        :prompt => "Wall Sign",                                           :format => "text")
free_sign                       = Field.create(:name => "free_sign",                        :prompt => "Free Sign",                                           :format => "text")
roof_sign                       = Field.create(:name => "roof_sign",                        :prompt => "Roof Sign",                                           :format => "text")
projecting_sign                 = Field.create(:name => "projecting_sign",                  :prompt => "Projecting Sign",                                     :format => "text")
wall_area                       = Field.create(:name => "wall_area",                        :prompt => "Wall Area (sq. ft)",                                  :format => "text")
frontage_of_lot                 = Field.create(:name => "frontage_of_lot",                  :prompt => "Frontage of Lot (ft)",                                :format => "text")
frontage_of_lot_area            = Field.create(:name => "frontage_of_lot_area",             :prompt => "Frontage of Lot (sq. ft) ???",                        :format => "text")
frontage_of_building            = Field.create(:name => "frontage_of_building",             :prompt => "Frontage of Building (ft)",                           :format => "text")
special_design_features         = Field.create(:name => "special_design_features",          :prompt => "Special design features / Materials",                 :format => "text")
flood_plain_maintenance         = Field.create(:name => "flood_plain_maintenance",          :prompt => "Flood Plain Maintenance (if applicable)",             :format => "text")
business_previous_address       = Field.create(:name => "business_previous_address",        :prompt => "Previous Service Address if within 2 years",          :format => "text")
business_fax                    = Field.create(:name => "business_fax",                     :prompt => "Business Fax #",                                      :format => "text")
business_email                  = Field.create(:name => "business_email",                   :prompt => "Business Email",                                      :format => "text")
business_license_num            = Field.create(:name => "business_license_num",             :prompt => "License #",                                           :format => "text")
business_license_expiration     = Field.create(:name => "business_license_expiration",      :prompt => "License Exp. Date",                                   :format => "text")
utility_start_date              = Field.create(:name => "utility_start_date",               :prompt => "Date to begin service",                               :format => "text")
utility_qty_containers          = Field.create(:name => "utility_qty_containers",           :prompt => "Container (1 yard, 2 yard, 4 yard, 5 yard)",          :format => "text")
utility_pickup_frequency        = Field.create(:name => "utility_pickup_frequency",         :prompt => "1 pickup? Additional pickups?",                       :format => "text")
fbn_start_date                  = Field.create(:name => "fbn_start_date",                   :prompt => "Start Date",                                          :format => "text")
ehp_application_type            = Field.create(:name => "ehp_application_type",             :prompt => "Type of Application (new, renewal, etc)",             :format => "text")
food_service_type               = Field.create(:name => "food_service_type",                :prompt => "Type of Food Service",                                :format => "text")
business_mailing_address_street = Field.create(:name => "business_mailing_address_street",  :prompt => "Business Mailing Address (street)",                   :format => "text")
business_mailing_address_detail = Field.create(:name => "business_mailing_address_detail",  :prompt => "Business Mailing Address (detail)",                   :format => "text")
business_mailing_address_city   = Field.create(:name => "business_mailing_address_city",    :prompt => "Business Mailing Address (city)",                     :format => "text")
business_mailing_address_state  = Field.create(:name => "business_mailing_address_state",   :prompt => "Business Mailing Address (state)",                    :format => "text")
business_mailing_address_zip    = Field.create(:name => "business_mailing_address_zip",     :prompt => "Business Mailing Address (zip)",                      :format => "text")
business_other_phone            = Field.create(:name => "business_other_phone",             :prompt => "Business Other Phone",                                :format => "text")

puts "SEEDING: SANTA CRUZ FORMS"

form_zoning_clearance                = Form.create(:title => "Zoning Clearance",                               :jurisdiction => "city")
form_business_license                = Form.create(:title => "Business License",                               :jurisdiction => "city")
form_owner_agent                     = Form.create(:title => "Owner Agent Form",                               :jurisdiction => "city")
form_building_permit                 = Form.create(:title => "Building Permit",                                :jurisdiction => "city")
form_administrative_use_permit       = Form.create(:title => "Administrative Use Permit",                      :jurisdiction => "city")
form_special_use_permit              = Form.create(:title => "Special Use Permit",                             :jurisdiction => "city")
form_application_for_utility_service = Form.create(:title => "Application for Utility Service",                :jurisdiction => "city")
form_fictitious_business_name        = Form.create(:title => "Fictitious Business Name Statement",             :jurisdiction => "county")
form_environmental_health            = Form.create(:title => "Environmental Health Permit",                    :jurisdiction => "county")
form_sellers_permit                  = Form.create(:title => "Seller's Permit",                                :jurisdiction => "state")
form_llp_registration                = Form.create(:title => "Limited Liability Partnership Registration",     :jurisdiction => "state")
form_lp_registration                 = Form.create(:title => "Limited Partnership Registration",               :jurisdiction => "state")
form_incorporation                   = Form.create(:title => "Articles of Incorporation Filing",               :jurisdiction => "state")
form_payroll_tax                     = Form.create(:title => "Registration with EDD (Payroll Tax form)",       :jurisdiction => "state")
form_ein_sole_proprietor             = Form.create(:title => "IRS EIN Application (Sole Proprietor)",          :jurisdiction => "federal")
form_ein_corporation                 = Form.create(:title => "IRS EIN Application (Corporation; S-Corp; etc)", :jurisdiction => "federal")
form_ein_llc                         = Form.create(:title => "IRS EIN Application (LLC)",                      :jurisdiction => "federal")

puts "SEEDING: ASSIGN FIELDS TO FORMS"

# Zoning Clearance
puts "...Zoning Clearance.."

form_zoning_clearance.fields << business_address_street
form_zoning_clearance.fields << business_address_detail
form_zoning_clearance.fields << business_address_city
form_zoning_clearance.fields << business_address_state
form_zoning_clearance.fields << business_address_zip
form_zoning_clearance.fields << business_phone
form_zoning_clearance.fields << business_name
form_zoning_clearance.fields << apn
form_zoning_clearance.fields << zoning_district
form_zoning_clearance.fields << applicant_first_name
form_zoning_clearance.fields << applicant_last_name
form_zoning_clearance.fields << applicant_phone
form_zoning_clearance.fields << applicant_address_street
form_zoning_clearance.fields << applicant_address_detail
form_zoning_clearance.fields << applicant_address_city
form_zoning_clearance.fields << applicant_address_state
form_zoning_clearance.fields << applicant_address_zip
form_zoning_clearance.fields << intended_use
form_zoning_clearance.fields << prior_use
form_zoning_clearance.fields << date_of_occupancy
form_zoning_clearance.fields << total_area
form_zoning_clearance.fields << first_floor_area
form_zoning_clearance.fields << outdoor_area
form_zoning_clearance.fields << single_or_multi_tenant
form_zoning_clearance.fields << auto_parking_spaces
form_zoning_clearance.fields << bicycle_parking_spaces

# Business License
puts "...Business License..."

form_business_license.fields << business_address_street
form_business_license.fields << business_address_detail
form_business_license.fields << business_address_city
form_business_license.fields << business_address_state
form_business_license.fields << business_address_zip
form_business_license.fields << business_phone
form_business_license.fields << business_name
form_business_license.fields << business_emergency_phone
form_business_license.fields << applicant_first_name
form_business_license.fields << applicant_last_name
form_business_license.fields << applicant_phone
form_business_license.fields << applicant_address_street
form_business_license.fields << applicant_address_detail
form_business_license.fields << applicant_address_city
form_business_license.fields << applicant_address_state
form_business_license.fields << applicant_address_zip
form_business_license.fields << applicant_ssn
form_business_license.fields << business_structure
form_business_license.fields << business_additional_owners
form_business_license.fields << intended_use
form_business_license.fields << date_of_occupancy
form_business_license.fields << number_of_rental_units
form_business_license.fields << total_area
form_business_license.fields << apn
form_business_license.fields << state_id
form_business_license.fields << state_sales_tax_id
form_business_license.fields << fin_ein
form_business_license.fields << state_contractors_license
form_business_license.fields << number_of_employees

# Owner Agent Form
puts "...Owner Agent Form..."

form_owner_agent.fields << apn
form_owner_agent.fields << business_address_street
form_owner_agent.fields << business_address_detail
form_owner_agent.fields << business_address_city
form_owner_agent.fields << business_address_state
form_owner_agent.fields << business_address_zip
form_owner_agent.fields << agent_name
form_owner_agent.fields << agent_address
form_owner_agent.fields << agent_phone
form_owner_agent.fields << owner_name
form_owner_agent.fields << owner_address
form_owner_agent.fields << owner_phone
form_owner_agent.fields << date

# Building Permit
puts "...Building Permit..."

form_building_permit.fields << permit_id
form_building_permit.fields << date
form_building_permit.fields << expansion_plan_check_due_date
form_building_permit.fields << business_address_street
form_building_permit.fields << business_address_detail
form_building_permit.fields << business_address_city
form_building_permit.fields << business_address_state
form_building_permit.fields << business_address_zip
form_building_permit.fields << apn
form_building_permit.fields << square_footage_new
form_building_permit.fields << role_of_applicant
form_building_permit.fields << applicant_first_name
form_building_permit.fields << applicant_last_name
form_building_permit.fields << applicant_address_street
form_building_permit.fields << applicant_address_detail
form_building_permit.fields << applicant_address_city
form_building_permit.fields << applicant_address_state
form_building_permit.fields << applicant_address_zip
form_building_permit.fields << applicant_phone
form_building_permit.fields << applicant_email
form_building_permit.fields << role_of_professional
form_building_permit.fields << professional_name
form_building_permit.fields << professional_address
form_building_permit.fields << professional_phone
form_building_permit.fields << professional_email
form_building_permit.fields << contractor_license_num
form_building_permit.fields << occupancy_class
form_building_permit.fields << type_of_construction
form_building_permit.fields << building_height_feet
form_building_permit.fields << building_height_stories
form_building_permit.fields << sprinklers
form_building_permit.fields << is_quimby_fee
form_building_permit.fields << is_tif_project

# Administrative Use Permit (AUP)
puts "...AUP..."

form_administrative_use_permit.fields << lot_size
form_administrative_use_permit.fields << total_land_area
form_administrative_use_permit.fields << proposed_floor_area
form_administrative_use_permit.fields << existing_floor_area
form_administrative_use_permit.fields << total_floor_area
form_administrative_use_permit.fields << building_height
form_administrative_use_permit.fields << accessory_building_height
form_administrative_use_permit.fields << auto_parking_breakdown
form_administrative_use_permit.fields << bicycle_parking_breakdown
form_administrative_use_permit.fields << wall_sign
form_administrative_use_permit.fields << free_sign
form_administrative_use_permit.fields << roof_sign
form_administrative_use_permit.fields << projecting_sign
form_administrative_use_permit.fields << wall_area
form_administrative_use_permit.fields << frontage_of_lot
form_administrative_use_permit.fields << frontage_of_lot_area
form_administrative_use_permit.fields << frontage_of_building
form_administrative_use_permit.fields << special_design_features
form_administrative_use_permit.fields << flood_plain_maintenance

# Special Use Permit (SUP)
# (note: exactly the same as AUP)
puts "...SUP..."

form_special_use_permit.fields << lot_size
form_special_use_permit.fields << total_land_area
form_special_use_permit.fields << proposed_floor_area
form_special_use_permit.fields << existing_floor_area
form_special_use_permit.fields << total_floor_area
form_special_use_permit.fields << building_height
form_special_use_permit.fields << accessory_building_height
form_special_use_permit.fields << auto_parking_breakdown
form_special_use_permit.fields << bicycle_parking_breakdown
form_special_use_permit.fields << wall_sign
form_special_use_permit.fields << free_sign
form_special_use_permit.fields << roof_sign
form_special_use_permit.fields << projecting_sign
form_special_use_permit.fields << wall_area
form_special_use_permit.fields << frontage_of_lot
form_special_use_permit.fields << frontage_of_lot_area
form_special_use_permit.fields << frontage_of_building
form_special_use_permit.fields << special_design_features
form_special_use_permit.fields << flood_plain_maintenance

# Application for Utility Service
puts "...Application for Utility Service..."

form_application_for_utility_service.fields << business_name
form_application_for_utility_service.fields << business_address_street
form_application_for_utility_service.fields << business_address_detail
form_application_for_utility_service.fields << business_address_city
form_application_for_utility_service.fields << business_address_state
form_application_for_utility_service.fields << business_address_zip
form_application_for_utility_service.fields << business_previous_address
form_application_for_utility_service.fields << business_phone
form_application_for_utility_service.fields << business_fax
form_application_for_utility_service.fields << business_email
form_application_for_utility_service.fields << business_license_num
form_application_for_utility_service.fields << business_license_expiration
form_application_for_utility_service.fields << utility_start_date
form_application_for_utility_service.fields << utility_qty_containers
form_application_for_utility_service.fields << utility_pickup_frequency

# Fictitious Business Name Statement
puts "...FBN..."

form_fictitious_business_name.fields << business_address_street
form_fictitious_business_name.fields << business_address_detail
form_fictitious_business_name.fields << business_address_city
form_fictitious_business_name.fields << business_address_state
form_fictitious_business_name.fields << business_address_zip
form_fictitious_business_name.fields << business_name
form_fictitious_business_name.fields << applicant_first_name
form_fictitious_business_name.fields << applicant_last_name
form_fictitious_business_name.fields << applicant_address_street
form_fictitious_business_name.fields << applicant_address_detail
form_fictitious_business_name.fields << applicant_address_city
form_fictitious_business_name.fields << applicant_address_state
form_fictitious_business_name.fields << applicant_address_zip
form_fictitious_business_name.fields << business_structure
form_fictitious_business_name.fields << fbn_start_date

# Environmental Health Permit
puts "...EHP..."

form_environmental_health.fields << ehp_application_type
form_environmental_health.fields << food_service_type
form_environmental_health.fields << business_address_street
form_environmental_health.fields << business_address_detail
form_environmental_health.fields << business_address_city
form_environmental_health.fields << business_address_state
form_environmental_health.fields << business_address_zip
form_environmental_health.fields << business_mailing_address_street
form_environmental_health.fields << business_mailing_address_detail
form_environmental_health.fields << business_mailing_address_city
form_environmental_health.fields << business_mailing_address_state
form_environmental_health.fields << business_mailing_address_zip
form_environmental_health.fields << applicant_email
form_environmental_health.fields << business_phone
form_environmental_health.fields << business_other_phone
form_environmental_health.fields << prior_use

# @TODO Seller's Permit
# @TODO Limited Liability Partnership Registration
# @TODO Limited Partnership Registration
# @TODO Articles of Incorporation Filing
# @TODO Registration with EDD (Payroll Tax form)
# @TODO IRS EIN Application (Sole Proprietor)
# @TODO IRS EIN Application (Corporation; S-Corp; etc)
# @TODO IRS EIN Application (LLC)