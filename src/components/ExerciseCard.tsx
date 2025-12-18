import { Exercise, UserExerciseMax, calculateWeight } from '@/lib/workoutData';
import { cn } from '@/lib/utils';

interface ExerciseCardProps {
  exercise: Exercise;
  userMaxes: UserExerciseMax[];
  index: number;
}

export function ExerciseCard({ exercise, userMaxes, index }: ExerciseCardProps) {
  const suggestedWeight = calculateWeight(exercise, userMaxes);
  const userMax = userMaxes.find(m => m.exerciseId === exercise.id)?.maxWeight || 0;

  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-xl p-5 animate-slide-up",
        "hover:border-primary/30 transition-colors duration-200"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-lg text-foreground">{exercise.name}</h4>
          <p className="text-sm text-muted-foreground mt-1">{exercise.description}</p>
        </div>
        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
          {exercise.percentageOfMax}% van max
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-3 bg-secondary/50 rounded-lg">
          <p className="text-2xl font-display text-primary">{exercise.sets}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Sets</p>
        </div>
        <div className="text-center p-3 bg-secondary/50 rounded-lg">
          <p className="text-2xl font-display text-primary">{exercise.reps}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Reps</p>
        </div>
        <div className="text-center p-3 bg-secondary/50 rounded-lg">
          <p className="text-2xl font-display text-primary">{exercise.restSeconds}s</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Rust</p>
        </div>
      </div>

      {userMax > 0 ? (
        <div className="mt-4 p-3 gradient-primary rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-primary-foreground">Aanbevolen gewicht</span>
            <span className="text-xl font-display text-primary-foreground">{suggestedWeight} kg</span>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-secondary/30 border border-dashed border-border rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Voeg je max gewicht toe in Profiel om gewichtsuggesties te zien
          </p>
        </div>
      )}
    </div>
  );
}
