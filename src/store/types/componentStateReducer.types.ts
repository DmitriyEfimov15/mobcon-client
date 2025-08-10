export interface ComponentState {
    [nodeId: string]: {
      [field: string]: unknown;
    };
  }