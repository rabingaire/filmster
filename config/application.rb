require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Filmster
  class Application < Rails::Application
    config.generators do |g|
      g.helper false
      g.assets false
    end
    config.autoload_paths << Rails.root.join('services')
  end
end
