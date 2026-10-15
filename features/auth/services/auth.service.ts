import { AuthResponse, LoginCredentials } from "../types";

/**
 * Authentication service handling login and session management.
 * Pre-configured for seamless transition from mock to backend FastAPI endpoints.
 */
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic validation
    if (!credentials.email || !credentials.password) {
      throw new Error("Please enter both email and password.");
    }

    if (!credentials.email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }

    // Default mock response for MVP
    const mockUser: AuthResponse = {
      token: "cf_mock_session_token_" + Date.now(),
      user: {
        id: "usr_org_01",
        email: credentials.email,
        name: "Conference Organizer",
        role: "conference_admin",
      },
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("confflow_auth", JSON.stringify(mockUser));
    }

    return mockUser;
  },

  getCurrentUser() {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("confflow_auth");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AuthResponse;
    } catch {
      return null;
    }
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("confflow_auth");
    }
  },
};

