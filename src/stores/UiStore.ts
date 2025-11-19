import { makeAutoObservable } from "mobx";

export class UiStore {
  isLoading = false;
  activeRequestCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  isBusy() {
    this.isLoading = true;
    this.activeRequestCount++;
  }

  isIdle() {
    this.isLoading = false;
    this.activeRequestCount = Math.max(0, this.activeRequestCount - 1);
  }

  get isGlobalLoading() {
    return this.activeRequestCount > 0;
  }
}
