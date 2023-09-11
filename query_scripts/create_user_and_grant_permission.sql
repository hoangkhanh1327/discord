-- Create User with username and password
CREATE USER 'admin_discord'@'localhost' IDENTIFIED BY '27101999';

-- Grant permission for new user account
GRANT ALL PRIVILEGES ON discord.* TO 'admin_discord'@'localhost';

-- Apply all changes immediately
FLUSH PRIVILEGES;