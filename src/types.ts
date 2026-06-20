export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
}

export interface DailyViewType {
  date: string;
  breakfastReshuffles: number;
  lunchReshuffles: number;
  dinnerReshuffles: number;
}

export interface WaterLog {
  date: string; // YYYY-MM-DD
  glasses: number;
  target: number;
}

export interface ExerciseLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  caloriesBurned: number;
  type: string;
}

export interface AppState {
  waterLogs: Record<string, WaterLog>;
  exerciseLogs: ExerciseLogEntry[];
  targetCalories: number;
  isWeightGainMode: boolean;
}
