import { WorkoutLog, muscleGroups } from '@/lib/workoutData';
import { Flame, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface DashboardProps {
  userName: string;
  recentWorkouts: WorkoutLog[];
  totalWorkouts: number;
  thisWeekWorkouts: number;
}

export function Dashboard({ userName, recentWorkouts, totalWorkouts, thisWeekWorkouts }: DashboardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Goedemorgen';
    if (hour < 18) return 'Goedemiddag';
    return 'Goedenavond';
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="font-display text-5xl md:text-7xl text-foreground mb-2">
          {getGreeting()}{userName ? `, ${userName}` : ''}!
        </h1>
        <p className="text-muted-foreground text-lg">
          Klaar om te pompen? 💪
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Flame className="h-6 w-6" />}
          label="Deze week"
          value={thisWeekWorkouts.toString()}
          suffix="workouts"
          color="text-primary"
        />
        <StatCard 
          icon={<Trophy className="h-6 w-6" />}
          label="Totaal"
          value={totalWorkouts.toString()}
          suffix="workouts"
          color="text-yellow-500"
        />
        <StatCard 
          icon={<Calendar className="h-6 w-6" />}
          label="Streak"
          value={Math.min(thisWeekWorkouts, 7).toString()}
          suffix="dagen"
          color="text-green-500"
        />
        <StatCard 
          icon={<TrendingUp className="h-6 w-6" />}
          label="Gemiddeld"
          value={(totalWorkouts > 0 ? (totalWorkouts / 4).toFixed(1) : '0')}
          suffix="/week"
          color="text-blue-500"
        />
      </div>

      {/* Recent Workouts */}
      <div>
        <h2 className="font-display text-3xl text-foreground mb-4">
          RECENTE WORKOUTS
        </h2>
        
        {recentWorkouts.length > 0 ? (
          <div className="space-y-3">
            {recentWorkouts.map((workout) => {
              const group = muscleGroups.find(g => g.id === workout.muscleGroup);
              const date = new Date(workout.date);
              const totalSets = workout.exercises.reduce((acc, e) => acc + e.sets.length, 0);
              const totalVolume = workout.exercises.reduce((acc, e) => 
                acc + e.sets.reduce((setAcc, s) => setAcc + (s.weight * s.reps), 0), 0
              );

              return (
                <div 
                  key={workout.id}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group?.icon}</span>
                      <div>
                        <h3 className="font-semibold text-foreground">{group?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(date, 'EEEE d MMMM', { locale: nl })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl text-primary">{totalSets}</p>
                      <p className="text-xs text-muted-foreground">sets</p>
                    </div>
                  </div>
                  {totalVolume > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Totaal volume: <span className="text-foreground font-medium">{totalVolume.toLocaleString()} kg</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card border border-dashed border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground">
              Nog geen workouts gedaan. Start je eerste workout!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix: string;
  color: string;
}

function StatCard({ icon, label, value, suffix, color }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
      <div className={`${color} mb-2`}>{icon}</div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="font-display text-3xl text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{suffix}</span>
      </div>
    </div>
  );
}
