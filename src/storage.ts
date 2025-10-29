import AsyncStorage from '@react-native-async-storage/async-storage';

// ===== STORAGE KEYS =====
export const STORAGE_KEYS = {
  // Authentication (จาก TokenResponse)
  ACCESS_TOKEN: 'accessToken',
  TOKEN_TYPE: 'tokenType',
  
  // User Data (จาก Register schema)
  USER_USERNAME: 'userUsername',
  USER_EMAIL: 'userEmail',
  USER_SURNAME: 'userSurname',
  
  // App State
  HAS_SEEN_ONBOARDING: 'hasSeenOnboarding',
  IS_LOGGED_IN: 'isLoggedIn',
};

// ===== INTERFACES =====
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  surname: string;
}

// ✅ อัพเดท: เพิ่ม User interface สำหรับ Supabase
export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    full_name?: string;
  };
}

// ✅ อัพเดท: เพิ่ม user property ใน TokenResponse
export interface TokenResponse {
  access_token: string;
  token_type: string;
  user?: User; // ✅ เพิ่ม property นี้
}

export interface ApiResponse<T> {
  code: string;
  status: string;
  message: string;
  result?: T;
}

// ===== STORAGE HELPER =====
export const Storage = {
  // ===== AUTHENTICATION =====
  
  saveAuthData: async (tokenData: TokenResponse, userData?: RegisterData): Promise<void> => {
    try {
      await Storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token);
      await Storage.setItem(STORAGE_KEYS.TOKEN_TYPE, tokenData.token_type);
      await Storage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
      
      // ✅ เก็บข้อมูล user จาก Supabase ถ้ามี
      if (tokenData.user) {
        await Storage.saveSupabaseUserData(tokenData.user);
      }
      
      // ✅ เก็บข้อมูล user จาก Register ถ้ามี
      if (userData) {
        await Storage.saveUserData(userData);
      }
      
      console.log('✅ Auth data saved successfully');
    } catch (error) {
      console.error('❌ Error saving auth data:', error);
      throw error;
    }
  },

  // ✅ เพิ่ม: ฟังก์ชันเก็บข้อมูล user จาก Supabase
  saveSupabaseUserData: async (user: User): Promise<void> => {
    try {
      if (user.email) {
        await Storage.setItem(STORAGE_KEYS.USER_EMAIL, user.email);
      }
      
      if (user.user_metadata) {
        const username = user.user_metadata.full_name || user.user_metadata.first_name || user.email || 'User';
        await Storage.setItem(STORAGE_KEYS.USER_USERNAME, username);
        
        if (user.user_metadata.last_name) {
          await Storage.setItem(STORAGE_KEYS.USER_SURNAME, user.user_metadata.last_name);
        }
      }
      
      console.log('✅ Supabase user data saved successfully');
    } catch (error) {
      console.error('❌ Error saving Supabase user data:', error);
      throw error;
    }
  },

  saveUserData: async (userData: RegisterData): Promise<void> => {
    try {
      await Storage.setItem(STORAGE_KEYS.USER_USERNAME, userData.username);
      await Storage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
      await Storage.setItem(STORAGE_KEYS.USER_SURNAME, userData.surname);
      
      console.log('✅ User data saved successfully');
    } catch (error) {
      console.error('❌ Error saving user data:', error);
      throw error;
    }
  },

  getTokenData: async (): Promise<TokenResponse | null> => {
    try {
      const accessToken = await Storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const tokenType = await Storage.getItem(STORAGE_KEYS.TOKEN_TYPE);

      if (!accessToken) {
        return null;
      }

      return {
        access_token: accessToken,
        token_type: tokenType || 'bearer'
      };
    } catch (error) {
      console.error('❌ Error getting token data:', error);
      return null;
    }
  },

  getUserData: async (): Promise<RegisterData | null> => {
    try {
      const username = await Storage.getItem(STORAGE_KEYS.USER_USERNAME);
      const email = await Storage.getItem(STORAGE_KEYS.USER_EMAIL);
      const surname = await Storage.getItem(STORAGE_KEYS.USER_SURNAME);

      if (!email) {
        return null;
      }

      return {
        username: username || '',
        email: email,
        surname: surname || '',
        password: ''
      };
    } catch (error) {
      console.error('❌ Error getting user data:', error);
      return null;
    }
  },

  isLoggedIn: async (): Promise<boolean> => {
    try {
      const accessToken = await Storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const isLoggedIn = await Storage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      return !!(accessToken && isLoggedIn === 'true');
    } catch (error) {
      console.error('❌ Error checking login status:', error);
      return false;
    }
  },

  getAccessToken: async (): Promise<string | null> => {
    return await Storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  logout: async (): Promise<void> => {
    try {
      await Storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      await Storage.removeItem(STORAGE_KEYS.TOKEN_TYPE);
      await Storage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
      await Storage.removeItem(STORAGE_KEYS.USER_USERNAME);
      await Storage.removeItem(STORAGE_KEYS.USER_EMAIL);
      await Storage.removeItem(STORAGE_KEYS.USER_SURNAME);
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Error during logout:', error);
      throw error;
    }
  },

  // ===== APP SETTINGS =====
  
  setOnboardingSeen: async (): Promise<void> => {
    await Storage.setItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING, 'true');
  },

  hasSeenOnboarding: async (): Promise<boolean> => {
    const hasSeen = await Storage.getItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING);
    return hasSeen === 'true';
  },

  // ===== BASIC STORAGE OPERATIONS =====
  
  setItem: async (key: string, value: any): Promise<void> => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`❌ Storage setItem error for key ${key}:`, error);
      throw error;
    }
  },

  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`❌ Storage getItem error for key ${key}:`, error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`❌ Storage removeItem error for key ${key}:`, error);
      throw error;
    }
  },

  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      console.log('🧹 All storage cleared');
    } catch (error) {
      console.error('❌ Storage clear error:', error);
      throw error;
    }
  }
};