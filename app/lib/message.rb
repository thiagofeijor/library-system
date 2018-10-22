class Message
  def self.not_found(record = 'record')
    "#{record}_not_found."
  end

  def self.invalid_credentials
    'invalid_credentials'
  end

  def self.invalid_token
    'invalid_token'
  end

  def self.missing_token
    'missing_token'
  end

  def self.unauthorized
    'unauthorized_request'
  end

  def self.account_created
    'account_created_successfully'
  end

  def self.authorization
    'authorization'
  end

  def self.account_not_created
    'account_not_created'
  end

  def self.expired_token
    'expired_token'
  end
end