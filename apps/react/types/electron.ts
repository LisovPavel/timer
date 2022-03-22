declare interface electronApi {
  setTitle: (title: string) => void;
}

interface Window {
  electronApi: electronApi;
}
