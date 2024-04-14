interface Authenticator {
  login(): void;
  logout(): void;
}

interface UserSettingsManager {
  setPreference(preference: string, value: any): void;
  getPreference(preference: string): any;
}

class SimpleAuthenticator implements Authenticator {
  login() {
    console.log("User logged in using SimpleAuthenticator");
  }
  logout() {
    console.log("User logged out using SimpleAuthenticator");
  }
}

class AdvancedAuthenticator implements Authenticator {
  login() {
    console.log("User logged in with multifactor authentication");
  }
  logout() {
    console.log("User securely logged out and session cleared");
  }
}

interface UserSettingsManager {
  setPreference(preference: string, value: any): UserSettingsManager;
  getPreference(preference: string): any;
}

class PreferenceManager implements UserSettingsManager {
  private preferences: Map<string, any>;

  constructor(initialPreferences?: Map<string, any>) {
    // If initial preferences are provided, create a new Map from them to ensure immutability
    this.preferences = new Map(initialPreferences);
  }

  setPreference(preference: string, value: any): UserSettingsManager {
    const newPreferences = new Map(this.preferences);
    newPreferences.set(preference, value);
    return new PreferenceManager(newPreferences);
  }

  getPreference(preference: string) {
    return this.preferences.get(preference);
  }
}

class User {
  constructor(
    private authenticator: Authenticator,
    private settingsManager: UserSettingsManager
  ) {}

  login() {
    this.authenticator.login();
  }

  logout() {
    this.authenticator.logout();
  }

  setPreference(preference: string, value: any): User {
    const newSettingsManager = this.settingsManager.setPreference(
      preference,
      value
    );
    return new User(this.authenticator, newSettingsManager);
  }

  getPreference(preference: string) {
    return this.settingsManager.getPreference(preference);
  }
}

const guestUser = new User(new SimpleAuthenticator(), new PreferenceManager());
guestUser.login();
console.log(guestUser.getPreference("language")); // Outputs: undefined

const updatedGuestUser = guestUser.setPreference("language", "English");
console.log(updatedGuestUser.getPreference("language")); // Outputs: English
updatedGuestUser.logout();

const adminUser = new User(
  new AdvancedAuthenticator(),
  new PreferenceManager()
);
adminUser.login();
adminUser.logout();

export {};
