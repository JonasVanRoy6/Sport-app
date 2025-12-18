import { useState } from 'react';
import { muscleGroups, exercises, UserExerciseMax } from '@/lib/workoutData';
import { MuscleGroupCard } from './MuscleGroupCard';
import { ExerciseCard } from './ExerciseCard';
import { Button } from './ui/button';
import { ArrowLeft, Play } from 'lucide-react';

interface WorkoutGeneratorProps {
  userMaxes: UserExerciseMax[];
  onStartWorkout: (muscleGroupId: string) => void;
}

export function WorkoutGenerator({ userMaxes, onStartWorkout }: WorkoutGeneratorProps) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const selectedMuscleGroup = muscleGroups.find(g => g.id === selectedGroup);
  const workoutExercises = selectedGroup 
    ? exercises.filter(e => e.muscleGroup === selectedGroup).slice(0, 4)
    : [];

  return (
    <div className="space-y-6">
      {!selectedGroup ? (
        <>
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">
              KIES JE <span className="text-gradient">SPIERGROEP</span>
            </h2>
            <p className="text-muted-foreground">
              Selecteer een spiergroep en krijg direct een op maat gemaakt schema
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {muscleGroups.map((group) => (
              <MuscleGroupCard
                key={group.id}
                group={group}
                onClick={() => setSelectedGroup(group.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedGroup(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                {selectedMuscleGroup?.icon} {selectedMuscleGroup?.name.toUpperCase()} WORKOUT
              </h2>
              <p className="text-muted-foreground text-sm">
                {workoutExercises.length} oefeningen • ~45-60 min
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {workoutExercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                userMaxes={userMaxes}
                index={index}
              />
            ))}
          </div>

          <Button 
            variant="glow" 
            size="xl" 
            className="w-full mt-6"
            onClick={() => onStartWorkout(selectedGroup)}
          >
            <Play className="h-5 w-5 mr-2" />
            START WORKOUT
          </Button>
        </>
      )}
    </div>
  );
}
