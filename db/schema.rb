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

ActiveRecord::Schema.define(:version => 20120731042845) do

  create_table "businesses", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.string   "structure"
    t.string   "type"
    t.boolean  "is_home_occ"
    t.string   "physical_address_street"
    t.string   "physical_address_detail"
    t.string   "physical_address_city"
    t.string   "physical_address_state"
    t.integer  "physical_address_zip"
    t.string   "mailing_address_street"
    t.string   "mailing_address_detail"
    t.string   "mailing_address_city"
    t.string   "mailing_address_state"
    t.integer  "mailing_address_zip"
    t.integer  "phone"
    t.boolean  "is_sole_owner"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  create_table "commercially_sited_businesses", :force => true do |t|
    t.integer  "business_id_id"
    t.integer  "apn"
    t.string   "zoning_district"
    t.string   "intended_use"
    t.string   "prior_use"
    t.float    "area_sqft_total"
    t.float    "area_sqft_first_floor"
    t.float    "area_sqft_outdoor"
    t.boolean  "is_single_tenant"
    t.integer  "car_parking_spaces"
    t.integer  "bicycle_parking_spaces"
    t.datetime "created_at",             :null => false
    t.datetime "updated_at",             :null => false
  end

  add_index "commercially_sited_businesses", ["business_id_id"], :name => "index_commercially_sited_businesses_on_business_id_id"

  create_table "field_answers", :force => true do |t|
    t.text     "answer"
    t.integer  "user_id"
    t.integer  "field_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "fields", :force => true do |t|
    t.string   "format"
    t.text     "prompt"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "form_id"
  end

  create_table "fields_forms", :id => false, :force => true do |t|
    t.integer  "field_id"
    t.integer  "form_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "forms", :force => true do |t|
    t.string   "title"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.string   "jurisdiction"
  end

  create_table "owners", :force => true do |t|
    t.integer  "business_id_id"
    t.string   "position"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "physical_address_street"
    t.string   "physical_address_detail"
    t.string   "physical_address_city"
    t.string   "physical_address_state"
    t.integer  "physical_address_zip"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  add_index "owners", ["business_id_id"], :name => "index_owners_on_business_id_id"

  create_table "users", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "last_state"
    t.string   "email"
    t.string   "token"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "phone"
    t.string   "role"
  end

end
