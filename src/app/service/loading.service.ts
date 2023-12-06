import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading: boolean = false;

  setLoadingState(state: boolean) {
    this.isLoading = state;
  }

  getLoadingState(): boolean {
    return this.isLoading;
  }
}
