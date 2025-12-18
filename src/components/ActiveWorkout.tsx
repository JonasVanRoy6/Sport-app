import { useState, useEffect } from 'react';
import { exercises, muscleGroups, UserExerciseMax, calculateWeight, WorkoutLog } from '@/lib/workoutData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Check, X, Timer, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ActiveWorkoutProps {
  muscleGroupId: string;
  userMaxes: UserExerciseMax[];
  onComplete: (log: WorkoutLog) => void;
  onCancel: () => void;
}

interface SetData {
  weight: number;
  reps: number;
  completed: boolean;
}

interface ExerciseProgress {
  exerciseId: string;
  sets: SetData[];
}

export function ActiveWorkout({ muscleGroupId, userMaxes, onComplete, onCancel }: ActiveWorkoutProps) {
  const muscleGroup = muscleGroups.find(g => g.id === muscleGroupId);
  const workoutExercises = exercises.filter(e => e.muscleGroup === muscleGroupId).slice(0, 4);
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [restTimer, setRestTimer] = useState<number | null>(null);
  const [progress, setProgress] = useState<ExerciseProgress[]>(() => 
    workoutExercises.map(exercise => ({
      exerciseId: exercise.id,
      sets: Array(exercise.sets).fill(null).map(() => ({
        weight: calculateWeight(exercise, userMaxes) || 20,
        reps: parseInt(exercise.reps.split('-')[0]) || 10,
        completed: false,
      })),
    }))
  );

  const currentExercise = workoutExercises[currentExerciseIndex];
  const currentProgress = progress[currentExerciseIndex];
  const totalSets = workoutExercises.reduce((acc, e) => acc + e.sets, 0);
  const completedSets = progress.reduce((acc, p) => acc + p.sets.filter(s => s.completed).length, 0);

  // Rest timer countdown
  useEffect(() => {
    if (restTimer === null || restTimer <= 0) return;
    
    const interval = setInterval(() => {
      setRestTimer(prev => (prev !== null && prev > 0) ? prev - 1 : null);
    }, 1000);

    return () => clearInterval(interval);
  }, [restTimer]);

  const handleSetComplete = () => {
    const updatedProgress = [...progress];
    updatedProgress[currentExerciseIndex].sets[currentSetIndex].completed = true;
    setProgress(updatedProgress);

    // Check if we need to move to next set or exercise
    if (currentSetIndex < currentExercise.sets - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
      setRestTimer(currentExercise.restSeconds);
    } else if (currentExerciseIndex < workoutExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(0);
      setRestTimer(90); // Longer rest between exercises
    } else {
      // Workout complete!
      const log: WorkoutLog = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        muscleGroup: muscleGroupId,
        exercises: progress,
        completed: true,
      };
      onComplete(log);
      toast.success('Workout voltooid! 💪');
    }
  };

  const updateSetWeight = (value: string) => {
    const weight = parseFloat(value) || 0;
    const updatedProgress = [...progress];
    updatedProgress[currentExerciseIndex].sets[currentSetIndex].weight = weight;
    setProgress(updatedProgress);
  };

  const updateSetReps = (value: string) => {
    const reps = parseInt(value) || 0;
    const updatedProgress = [...progress];
    updatedProgress[currentExerciseIndex].sets[currentSetIndex].reps = reps;
    setProgress(updatedProgress);
  };

  const skipRest = () => setRestTimer(null);

  const progressPercentage = (completedSets / totalSets) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-foreground">
            {muscleGroup?.icon} {muscleGroup?.name.toUpperCase()}
          </h2>
          <p className="text-muted-foreground text-sm">
            Oefening {currentExerciseIndex + 1} van {workoutExercises.length}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 gradient-primary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        {completedSets} / {totalSets} sets voltooid
      </p>

      {/* Rest Timer */}
      {restTimer !== null && restTimer > 0 && (
        <div className="bg-card border border-primary/50 rounded-xl p-6 text-center animate-scale-in">
          <Timer className="h-8 w-8 mx-auto mb-3 text-primary animate-pulse-glow" />
          <p className="text-muted-foreground mb-2">Rust tijd</p>
          <p className="font-display text-6xl text-primary">{restTimer}</p>
          <p className="text-sm text-muted-foreground mt-2">seconden</p>
          <Button variant="ghost" className="mt-4" onClick={skipRest}>
            Sla over <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Current Exercise */}
      {(restTimer === null || restTimer === 0) && currentExercise && (
        <div className="bg-card border border-border rounded-xl p-6 animate-scale-in">
          <div className="mb-6">
            <h3 className="font-display text-2xl text-foreground">{currentExercise.name}</h3>
            <p className="text-muted-foreground text-sm">{currentExercise.description}</p>
          </div>

          {/* Set Progress Indicators */}
          <div className="flex gap-2 mb-6">
            {currentProgress.sets.map((set, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex-1 h-2 rounded-full transition-colors",
                  set.completed ? "gradient-primary" : idx === currentSetIndex ? "bg-primary/30" : "bg-secondary"
                )}
              />
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-1">Set {currentSetIndex + 1} van {currentExercise.sets}</p>
            <p className="text-4xl font-display text-foreground">
              {currentExercise.reps} <span className="text-muted-foreground text-2xl">reps</span>
            </p>
          </div>

          {/* Weight & Reps Input */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                Gewicht (kg)
              </label>
              <Input
                type="number"
                value={currentProgress.sets[currentSetIndex].weight}
                onChange={(e) => updateSetWeight(e.target.value)}
                className="text-center text-xl font-semibold"
                min="0"
                step="2.5"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                Reps gedaan
              </label>
              <Input
                type="number"
                value={currentProgress.sets[currentSetIndex].reps}
                onChange={(e) => updateSetReps(e.target.value)}
                className="text-center text-xl font-semibold"
                min="0"
              />
            </div>
          </div>

          <Button 
            variant="glow" 
            size="xl" 
            className="w-full"
            onClick={handleSetComplete}
          >
            <Check className="h-5 w-5 mr-2" />
            SET VOLTOOID
          </Button>
        </div>
      )}

      {/* Exercise Overview */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Workout overzicht</p>
        {workoutExercises.map((exercise, idx) => {
          const exerciseProgress = progress[idx];
          const completedInExercise = exerciseProgress.sets.filter(s => s.completed).length;
          const isActive = idx === currentExerciseIndex;
          const isDone = completedInExercise === exercise.sets;

          return (
            <div 
              key={exercise.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-colors",
                isActive ? "bg-primary/10 border border-primary/30" : "bg-secondary/30",
                isDone && "opacity-60"
              )}
            >
              <div className="flex items-center gap-3">
                {isDone ? (
                  <Check className="h-5 w-5 text-primary" />
                ) : (
                  <span className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs",
                    isActive ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground"
                  )}>
                    {idx + 1}
                  </span>
                )}
                <span className={cn(
                  "font-medium",
                  isDone && "line-through",
                  isActive && "text-primary"
                )}>
                  {exercise.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {completedInExercise}/{exercise.sets}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
