if Rails.env.development?
  %w[user owner business commercially_sited_business].each do |c|
    require_dependency file.join("app","models","#{c}.rb")
  end
end
