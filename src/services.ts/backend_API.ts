import { API_BASE_URL } from '../config/api';

export interface FruitCreate {
  name: string;
  picture: string;
  description?: string;
}

export interface FruitUpdate {
  name?: string;
  picture?: string;
  description?: string;
}

export interface FruitResponse {
  id: number;
  name: string;
  picture: string;
  description?: string;
  createat: string;
}

export interface VegetableCreate {
  name: string;
  picture: string;
  description?: string;
}

export interface VegetableUpdate {
  name?: string;
  picture?: string;
  description?: string;
}

export interface VegetableResponse {
  id: number; // ✅ แก้เป็น number
  name: string;
  picture: string;
  description?: string;
  createat: string;
}

export interface FavoriteItem {
  id: number; // ✅ แก้เป็น number
  users_id: number;
  type: "vegetable" | "fruit";
  item_id: number;
  item_name: string;
  //item_description: string;
  item_image_url: string;
  createat: string;
}

export interface ToggleFavoriteRequest {
  users_id: number;
  fruit_id?: number | null;
  vegetable_id?: number | null;
}

class BackendApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return await response.json();
  }

  // ===== FRUITS =====
  async getFruits(): Promise<FruitResponse[]> {
    const response = await fetch(`${this.baseURL}/fruit/`);
    return this.handleResponse(response);
  }

  async getFruitById(id: number): Promise<FruitResponse> {
    const response = await fetch(`${this.baseURL}/fruit/${id}`);
    return this.handleResponse(response);
  }

  async createFruit(fruitData: FruitCreate): Promise<FruitResponse> {
    const response = await fetch(`${this.baseURL}/fruit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fruitData),
    });
    return this.handleResponse(response);
  }

  async updateFruit(id: number, fruitData: FruitUpdate): Promise<FruitResponse> {
    const response = await fetch(`${this.baseURL}/fruit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fruitData),
    });
    return this.handleResponse(response);
  }

  async deleteFruit(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/fruit/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  // ===== VEGETABLES =====
  async getVegetables(): Promise<VegetableResponse[]> {
    const response = await fetch(`${this.baseURL}/vegetable/`);
    return this.handleResponse(response);
  }

  async getVegetableById(id: number): Promise<VegetableResponse> {
    const response = await fetch(`${this.baseURL}/vegetable/${id}`);
    return this.handleResponse(response);
  }

  async createVegetable(vegetableData: VegetableCreate): Promise<VegetableResponse> {
    const response = await fetch(`${this.baseURL}/vegetable/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vegetableData),
    });
    return this.handleResponse(response);
  }

  async updateVegetable(id: number, vegetableData: VegetableUpdate): Promise<VegetableResponse> {
    const response = await fetch(`${this.baseURL}/vegetable/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vegetableData),
    });
    return this.handleResponse(response);
  }

  async deleteVegetable(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/vegetable/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  // ===== FAVORITES =====
  async getFavorites(userId: number): Promise<FavoriteItem[]> {
    const response = await fetch(`${this.baseURL}/favorites?users_id=${userId}`);
    return this.handleResponse(response);
  }

  async toggleFavorite(request: ToggleFavoriteRequest): Promise<any> {
    const response = await fetch(`${this.baseURL}/favorite/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    return this.handleResponse(response);
  }

  // ===== SEARCH =====
  async search(query: string): Promise<any> {
    const response = await fetch(`${this.baseURL}/search?q=${encodeURIComponent(query)}`);
    return this.handleResponse(response);
  }
}

export const backendApi = new BackendApiService();