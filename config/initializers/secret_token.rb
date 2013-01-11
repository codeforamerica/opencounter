# Be sure to restart your server when you modify this file.

# Your secret key for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!
# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
#
if Rails.env.production? && ENV['SECRET_TOKEN'].blank?
    raise 'SECRET_TOKEN environment variable must be set!'
end

Opencounter::Application.config.secret_token =
  ENV['SECRET_TOKEN'] || '295ff5b00376ae17a65225f202e74c02f8228feb708b33ad2d6749385a103ea69954cbd20a131fa4dec51618f5dc799401d9af174f6bb9e85c65e2f395e6498e'
