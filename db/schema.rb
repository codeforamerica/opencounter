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

ActiveRecord::Schema.define(:version => 20121205214719) do

  create_table "admin_users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "admin_users", ["email"], :name => "index_admin_users_on_email", :unique => true
  add_index "admin_users", ["reset_password_token"], :name => "index_admin_users_on_reset_password_token", :unique => true

  create_table "answers", :force => true do |t|
    t.text     "value"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "business_id"
    t.string   "field_name"
  end

  create_table "businesses", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.boolean  "submitted"
    t.datetime "submitted_at"
  end

  create_table "cic_code_requirements", :force => true do |t|
    t.integer  "cic_code_id"
    t.integer  "requirement_id"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "cic_code_requirements", ["cic_code_id"], :name => "index_cic_code_requirements_on_cic_code_id"
  add_index "cic_code_requirements", ["requirement_id"], :name => "index_cic_code_requirements_on_requirement_id"

  create_table "cic_code_zoning_districts", :force => true do |t|
    t.integer  "cic_code_id"
    t.integer  "zoning_district_id"
    t.integer  "permission",          :default => 5
    t.boolean  "home_occ_prohibited", :default => false
    t.text     "notes"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "cic_code_zoning_districts", ["cic_code_id"], :name => "index_cic_code_zoning_districts_on_cic_code_id"
  add_index "cic_code_zoning_districts", ["zoning_district_id"], :name => "index_cic_code_zoning_districts_on_zoning_district_id"

  create_table "cic_codes", :force => true do |t|
    t.string   "code"
    t.string   "industry"
    t.string   "subindustry"
    t.text     "keywords"
    t.boolean  "home_occ_prohibited", :default => false
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.integer  "parent_id"
  end

  add_index "cic_codes", ["code"], :name => "index_cic_codes_on_code"
  add_index "cic_codes", ["keywords"], :name => "index_cic_codes_on_keywords"

  create_table "cic_codes_sic_codes", :id => false, :force => true do |t|
    t.integer "cic_code_id"
    t.integer "sic_code_id"
  end

  add_index "cic_codes_sic_codes", ["cic_code_id"], :name => "index_cic_codes_sic_codes_on_cic_code_id"
  add_index "cic_codes_sic_codes", ["sic_code_id"], :name => "index_cic_codes_sic_codes_on_sic_code_id"

  create_table "delayed_jobs", :force => true do |t|
    t.integer  "priority",   :default => 0
    t.integer  "attempts",   :default => 0
    t.text     "handler"
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "delayed_jobs", ["priority", "run_at"], :name => "delayed_jobs_priority"

  create_table "fields", :force => true do |t|
    t.string   "format"
    t.text     "prompt"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "name"
  end

  create_table "fields_forms", :id => false, :force => true do |t|
    t.integer "field_id"
    t.integer "form_id"
  end

  create_table "forms", :force => true do |t|
    t.string   "title"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.string   "jurisdiction"
  end

  create_table "requirement_zoning_districts", :force => true do |t|
    t.integer  "zoning_district_id"
    t.integer  "requirement_id"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  add_index "requirement_zoning_districts", ["requirement_id"], :name => "index_requirement_zoning_districts_on_requirement_id"
  add_index "requirement_zoning_districts", ["zoning_district_id"], :name => "index_requirement_zoning_districts_on_zoning_district_id"

  create_table "requirements", :force => true do |t|
    t.string   "name"
    t.text     "notes"
    t.string   "jurisdiction"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.string   "short_name"
    t.boolean  "home_occ",     :default => false
    t.boolean  "commercial",   :default => false
  end

  create_table "sic_codes", :force => true do |t|
    t.string   "code"
    t.string   "industry"
    t.string   "subindustry"
    t.integer  "parent_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "sic_codes", ["code"], :name => "index_sic_codes_on_code"

  create_table "users", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "last_state"
    t.string   "email"
    t.string   "token"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.string   "phone"
    t.string   "role"
    t.string   "remember_token"
  end

  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"

  create_table "zoning_districts", :force => true do |t|
    t.string   "code"
    t.string   "name"
    t.text     "description"
    t.boolean  "home_occ_prohibited", :default => false
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "zoning_districts", ["code"], :name => "index_zoning_districts_on_code"

end
