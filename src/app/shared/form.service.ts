import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface FormQuestion {
  question: string;
  type: 'text' | 'multiple-choice';
  options?: string[];
  required: boolean;
}

export interface Form {
  title: string;
  questions: FormQuestion[];
  submitted: boolean;
}

@Injectable({ providedIn: 'root' })
export class FormDataService {
  private readonly storageKey = 'form-data';
  private readonly platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setForm(form: Form): void {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(form));
        console.log('✅ Form saved to localStorage:', form);
      } catch (e) {
        console.error('❌ Error saving to localStorage:', e);
      }
    }
  }

  form(): Form | null {
    if (this.isBrowser()) {
      try {
        const data = localStorage.getItem(this.storageKey);
        const parsed = data ? JSON.parse(data) : null;
        console.log('📦 Loaded form from localStorage:', parsed);
        return parsed;
      } catch (e) {
        console.error('❌ Error reading localStorage:', e);
      }
    }
    return null;
  }

  markSubmitted(): void {
    const form = this.form();
    if (form) {
      form.submitted = true;
      this.setForm(form);
    }
  }

  reset(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
      console.log('🧹 Cleared form from localStorage');
    }
  }
}