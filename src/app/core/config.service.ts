import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Config {
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configSignal = signal<Config | null>(null);
  config = this.configSignal.asReadonly();

  constructor(private http: HttpClient) {}

  async loadConfig(): Promise<void> {
    try {
      const config = await firstValueFrom(
        this.http.get<Config>('/config.json')
      );
      this.configSignal.set(config);
    } catch (error) {
      console.error('Failed to load config:', error);
      // Fallback to default
      this.configSignal.set({ apiUrl: 'http://localhost:8080' });
    }
  }

  getApiUrl(): string {
    return this.configSignal()?.apiUrl || 'http://localhost:8080';
  }
}
