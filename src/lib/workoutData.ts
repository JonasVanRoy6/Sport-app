export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  description: string;
  sets: number;
  reps: string;
  restSeconds: number;
  percentageOfMax: number; // Percentage of user's max weight
}

export interface MuscleGroup {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface UserExerciseMax {
  exerciseId: string;
  maxWeight: number;
}

export interface WorkoutLog {
  id: string;
  date: string;
  muscleGroup: string;
  exercises: {
    exerciseId: string;
    sets: {
      weight: number;
      reps: number;
      completed: boolean;
    }[];
  }[];
  completed: boolean;
}

export const muscleGroups: MuscleGroup[] = [
  { id: 'chest', name: 'Borst', icon: '💪', color: 'hsl(24 100% 50%)' },
  { id: 'back', name: 'Rug', icon: '🔙', color: 'hsl(200 100% 50%)' },
  { id: 'shoulders', name: 'Schouders', icon: '🎯', color: 'hsl(280 100% 60%)' },
  { id: 'legs', name: 'Benen', icon: '🦵', color: 'hsl(120 70% 45%)' },
  { id: 'arms', name: 'Armen', icon: '💪', color: 'hsl(340 80% 55%)' },
  { id: 'core', name: 'Core', icon: '🔥', color: 'hsl(45 100% 50%)' },
];

export const exercises: Exercise[] = [
  // Chest
  { id: 'bench-press', name: 'Bench Press', muscleGroup: 'chest', description: 'Klassieke borst oefening met barbell', sets: 4, reps: '8-10', restSeconds: 90, percentageOfMax: 75 },
  { id: 'incline-press', name: 'Incline Dumbbell Press', muscleGroup: 'chest', description: 'Bovenste borst focus', sets: 3, reps: '10-12', restSeconds: 75, percentageOfMax: 70 },
  { id: 'cable-fly', name: 'Cable Fly', muscleGroup: 'chest', description: 'Isolatie voor borst definitie', sets: 3, reps: '12-15', restSeconds: 60, percentageOfMax: 50 },
  { id: 'dips', name: 'Chest Dips', muscleGroup: 'chest', description: 'Compound beweging voor onderste borst', sets: 3, reps: '8-12', restSeconds: 90, percentageOfMax: 100 },
  
  // Back
  { id: 'deadlift', name: 'Deadlift', muscleGroup: 'back', description: 'Koning van alle oefeningen', sets: 4, reps: '5-6', restSeconds: 120, percentageOfMax: 85 },
  { id: 'lat-pulldown', name: 'Lat Pulldown', muscleGroup: 'back', description: 'Rug breedte opbouwen', sets: 4, reps: '10-12', restSeconds: 75, percentageOfMax: 70 },
  { id: 'barbell-row', name: 'Barbell Row', muscleGroup: 'back', description: 'Rug dikte en kracht', sets: 4, reps: '8-10', restSeconds: 90, percentageOfMax: 75 },
  { id: 'cable-row', name: 'Seated Cable Row', muscleGroup: 'back', description: 'Mid-back focus', sets: 3, reps: '10-12', restSeconds: 60, percentageOfMax: 65 },
  
  // Shoulders
  { id: 'ohp', name: 'Overhead Press', muscleGroup: 'shoulders', description: 'Compound schouder kracht', sets: 4, reps: '6-8', restSeconds: 90, percentageOfMax: 80 },
  { id: 'lateral-raise', name: 'Lateral Raise', muscleGroup: 'shoulders', description: 'Zijdeltoïde isolatie', sets: 4, reps: '12-15', restSeconds: 45, percentageOfMax: 40 },
  { id: 'face-pull', name: 'Face Pull', muscleGroup: 'shoulders', description: 'Achterste deltoïden en rotator cuff', sets: 3, reps: '15-20', restSeconds: 45, percentageOfMax: 35 },
  { id: 'arnold-press', name: 'Arnold Press', muscleGroup: 'shoulders', description: 'Complete schouder ontwikkeling', sets: 3, reps: '10-12', restSeconds: 75, percentageOfMax: 65 },
  
  // Legs
  { id: 'squat', name: 'Barbell Squat', muscleGroup: 'legs', description: 'Fundamentele beenoefening', sets: 4, reps: '6-8', restSeconds: 120, percentageOfMax: 80 },
  { id: 'leg-press', name: 'Leg Press', muscleGroup: 'legs', description: 'Veilige quad focus', sets: 4, reps: '10-12', restSeconds: 90, percentageOfMax: 80 },
  { id: 'rdl', name: 'Romanian Deadlift', muscleGroup: 'legs', description: 'Hamstrings en glutes', sets: 3, reps: '10-12', restSeconds: 90, percentageOfMax: 70 },
  { id: 'leg-curl', name: 'Leg Curl', muscleGroup: 'legs', description: 'Hamstring isolatie', sets: 3, reps: '12-15', restSeconds: 60, percentageOfMax: 60 },
  
  // Arms
  { id: 'barbell-curl', name: 'Barbell Curl', muscleGroup: 'arms', description: 'Bicep massa builder', sets: 3, reps: '10-12', restSeconds: 60, percentageOfMax: 70 },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', muscleGroup: 'arms', description: 'Tricep isolatie', sets: 3, reps: '12-15', restSeconds: 45, percentageOfMax: 65 },
  { id: 'hammer-curl', name: 'Hammer Curl', muscleGroup: 'arms', description: 'Brachialis en onderarm', sets: 3, reps: '10-12', restSeconds: 45, percentageOfMax: 65 },
  { id: 'skull-crusher', name: 'Skull Crusher', muscleGroup: 'arms', description: 'Tricep stretch en contractie', sets: 3, reps: '10-12', restSeconds: 60, percentageOfMax: 60 },
  
  // Core
  { id: 'cable-crunch', name: 'Cable Crunch', muscleGroup: 'core', description: 'Gewogen buikspier werk', sets: 3, reps: '15-20', restSeconds: 45, percentageOfMax: 50 },
  { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', muscleGroup: 'core', description: 'Onderste buikspieren', sets: 3, reps: '12-15', restSeconds: 60, percentageOfMax: 100 },
  { id: 'plank', name: 'Plank', muscleGroup: 'core', description: 'Core stabiliteit', sets: 3, reps: '45-60s', restSeconds: 45, percentageOfMax: 100 },
  { id: 'russian-twist', name: 'Russian Twist', muscleGroup: 'core', description: 'Obliques en rotatie', sets: 3, reps: '20 per kant', restSeconds: 45, percentageOfMax: 40 },
];

export function generateWorkout(muscleGroupId: string, userMaxes: UserExerciseMax[]): Exercise[] {
  const groupExercises = exercises.filter(e => e.muscleGroup === muscleGroupId);
  // Select 4-5 exercises for a complete workout
  const selectedExercises = groupExercises.slice(0, Math.min(4, groupExercises.length));
  return selectedExercises;
}

export function calculateWeight(exercise: Exercise, userMaxes: UserExerciseMax[]): number {
  const userMax = userMaxes.find(m => m.exerciseId === exercise.id);
  if (!userMax) return 0;
  return Math.round((userMax.maxWeight * exercise.percentageOfMax) / 100 / 2.5) * 2.5;
}

export function getDefaultMaxes(): UserExerciseMax[] {
  return exercises.map(e => ({
    exerciseId: e.id,
    maxWeight: 0,
  }));
}
