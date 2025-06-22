import CYBER_STORE from "./axios_instance";

export const authServices = {
  login: async (email: string, password: string) => {
    return CYBER_STORE.post("/auth/login", { email, password });
  },

  register: async (email: string, password: string, displayname: string) => {
    return CYBER_STORE.post("/auth/register", { email, password, displayname });
  },

  verifyOTP: async (email: string, token: string) => {
    return CYBER_STORE.post("/auth/verify-email", { email, token });
  },

  logout: async () => {
    return CYBER_STORE.post("/auth/logout");
  },

  getUserProfile: async () => {
    return CYBER_STORE.get("/auth/profile");
  },
};
