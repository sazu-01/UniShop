
interface Window {
  fbq: (
    command: string,
    eventName: string,
    params?: Record<string, any>
  ) => void;
}
