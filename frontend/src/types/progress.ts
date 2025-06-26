export interface ProgressStep {
  id: number;
  label: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  progress?: number; // For determinate progress (0-100)
}

export interface ProgressState {
  currentStep: number;
  steps: ProgressStep[];
  isLoading: boolean;
  error?: string;
}
