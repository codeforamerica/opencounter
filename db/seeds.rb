# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "SEEDING FORMS"

Form.create([
  { :title => "Zoning Clearance",                           :jurisdiction => "city" },
  { :title => "Business License",                           :jurisdiction => "city" },
  { :title => "Owner Agent Form",                           :jurisdiction => "city" },
  { :title => "Building Permit",                            :jurisdiction => "city" },
  { :title => "Administrative Use Permit",                  :jurisdiction => "city" },
  { :title => "Special Use Permit",                         :jurisdiction => "city" },
  { :title => "Application for Utility Service",            :jurisdiction => "city" },

  { :title => "Fictitious Business Name Statement",         :jurisdiction => "county" },
  { :title => "Environmental Health Permit",                :jurisdiction => "county" },

  { :title => "Seller's Permit",                            :jurisdiction => "state" },
  { :title => "Limited Liability Partnership Registration", :jurisdiction => "state" },
  { :title => "Limited Partnership Registration",           :jurisdiction => "state" },
  { :title => "Articles of Incorporation Filing",           :jurisdiction => "state" },
  { :title => "Registration with EDD (Payroll Tax form)",   :jurisdiction => "state" },

  { :title => "IRS EIN Application (Sole Proprietor)", :jurisdiction => "federal" },
  { :title => "IRS EIN Application (Corporation; S-Corp; etc)", :jurisdiction => "federal" },
  { :title => "IRS EIN Application (LLC)", :jurisdiction => "federal" }
])

