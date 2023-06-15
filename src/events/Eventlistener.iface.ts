export interface EventListener {
  handleEvent(event: Event): void | Promise<void>;
}
