# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120801161237) do

  create_table "business", :force => true do |t|
    t.text    "description"
    t.boolean "is_home_occ"
    t.boolean "is_sole_owner"
    t.string  "mailing_address_street"
    t.string  "mailing_address_city"
    t.string  "mailing_address_detail"
    t.string  "mailing_address_state"
    t.integer "mailing_address_zip"
    t.string  "physical_address_street"
    t.string  "physical_address_city"
    t.string  "physical_address_detail"
    t.string  "physical_address_state"
    t.integer "physical_address_zip"
    t.string  "name"
    t.integer "phone"
    t.string  "structure"
    t.string  "type"
    t.integer "apn"
    t.float   "area_sqft_first_floor"
    t.float   "area_sqft_outdoor"
    t.float   "area_sqft_total"
    t.integer "bicycle_parking_spaces"
    t.integer "car_parking_spaces"
    t.text    "intended_use"
    t.boolean "is_single_tenant"
    t.text    "prior_use"
    t.string  "zoning_district"
  end

  create_table "users", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.integer  "phone"
    t.string   "role"
    t.string   "last_state"
    t.string   "token"
    t.string   "physical_address_city"
    t.string   "physical_address_detail"
    t.integer  "physical_address_zip"
    t.string   "physical_address_street"
    t.string   "physical_address_state"
    t.integer  "drivers_license_number"
    t.boolean  "has_owned_eed_business"
    t.integer  "eed_account"
    t.string   "business_name"
    t.string   "eed_detail"
    t.string   "eed_street"
    t.string   "eed_state"
    t.string   "eed_city"
    t.integer  "eed_zip"
    t.string   "position"
    t.string   "type"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  create_table "users_businesses", :id => false, :force => true do |t|
    t.integer "user_id"
    t.integer "business_id"
  end

end
