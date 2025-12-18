import { useState } from 'react';
import { exercises, muscleGroups, UserExerciseMax } from '@/lib/workoutData';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Save, User } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileSettingsProps {
  userName: string;
  userMaxes: UserExerciseMax[];
  onUpdateName: (name: string) => void;
  onUpdateMax: (exerciseId: string, weight: number) => void;
}

export function ProfileSettings({ userName, userMaxes, onUpdateName, onUpdateMax }: ProfileSettingsProps) {
  const [name, setName] = useState(userName);
  const [localMaxes, setLocalMaxes] = useState<Record<string, string>>({});

  const handleSaveName = () => {
    onUpdateName(name);
    toast.success('Naam opgeslagen!');
  };

  const handleWeightChange = (exerciseId: string, value: string) => {
    setLocalMaxes(prev => ({ ...prev, [exerciseId]: value }));
  };

  const handleSaveWeight = (exerciseId: string) => {
    const value = localMaxes[exerciseId];
    if (value) {
      const weight = parseFloat(value);
      if (!isNaN(weight) && weight >= 0) {
        onUpdateMax(exerciseId, weight);
        toast.success('Gewicht opgeslagen!');
      }
    }
  };

  const getMaxWeight = (exerciseId: string): string => {
    if (localMaxes[exerciseId] !== undefined) {
      return localMaxes[exerciseId];
    }
    const max = userMaxes.find(m => m.exerciseId === exerciseId)?.maxWeight;
    return max ? max.toString() : '';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          JOUW <span className="text-gradient">PROFIEL</span>
        </h2>
        <p className="text-muted-foreground">
          Stel je max gewichten in voor gepersonaliseerde workouts
        </p>
      </div>

      {/* Name Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <h3 className="font-display text-2xl text-foreground">NAAM</h3>
        </div>
        <div className="flex gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Je naam"
            className="flex-1"
          />
          <Button onClick={handleSaveName} variant="default">
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Max Weights by Muscle Group */}
      {muscleGroups.map((group) => {
        const groupExercises = exercises.filter(e => e.muscleGroup === group.id);
        
        return (
          <div key={group.id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{group.icon}</span>
              <h3 className="font-display text-2xl text-foreground">{group.name.toUpperCase()}</h3>
            </div>
            
            <div className="space-y-4">
              {groupExercises.map((exercise) => (
                <div key={exercise.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{exercise.name}</p>
                    <p className="text-xs text-muted-foreground">Max gewicht (kg)</p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={getMaxWeight(exercise.id)}
                      onChange={(e) => handleWeightChange(exercise.id, e.target.value)}
                      placeholder="0"
                      className="w-24 text-center"
                      min="0"
                      step="2.5"
                    />
                    <Button 
                      size="icon" 
                      variant="secondary"
                      onClick={() => handleSaveWeight(exercise.id)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
