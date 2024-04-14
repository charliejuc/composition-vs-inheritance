class User {
  protected preferences: Map<string, any> = new Map();

  login() {
    console.log("User logged in");
  }

  logout() {
    console.log("User logged out");
  }

  setPreference(preference: string, value: any) {
    this.preferences.set(preference, value);
    console.log(`Preference ${preference} set to ${value}`);
  }

  getPreference(preference: string) {
    return this.preferences.get(preference);
  }
}

class AdminUser extends User {
  manageUsers() {
    console.log("Admin managing users");
  }

  login() {
    console.log("Admin user logged in with additional security checks");
  }
}

class GuestUser extends User {
  login() {
    console.log("Guest user logged in with restricted access");
  }

  logout() {
    console.log("Guest user logged out and session cleared");
  }

  // Overriding to prevent guests from setting certain preferences
  setPreference(preference: string, value: any) {
    if (preference === "language" || preference === "theme") {
      super.setPreference(preference, value);
    } else {
      console.log("Guest user cannot set this preference.");
    }
  }
}

const admin = new AdminUser();
admin.login();
admin.setPreference("language", "English");
admin.logout();

const guest = new GuestUser();
guest.login();
guest.setPreference("timezone", "GMT"); // Will be blocked
guest.logout();

export {};
