import { useState } from 'react';
import { Navigation, Tab } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { WorkoutGenerator } from '@/components/WorkoutGenerator';
import { ProfileSettings } from '@/components/ProfileSettings';
import { ActiveWorkout } from '@/components/ActiveWorkout';
import { useWorkoutStore } from '@/hooks/useWorkoutStore';
import { WorkoutLog } from '@/lib/workoutData';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [activeWorkoutGroup, setActiveWorkoutGroup] = useState<string | null>(null);
  
  const {
    userName,
    userMaxes,
    setUserName,
    updateMaxWeight,
    addWorkoutLog,
    getRecentWorkouts,
    getTotalWorkouts,
    getThisWeekWorkouts,
    isLoaded,
  } = useWorkoutStore();

  const handleStartWorkout = (muscleGroupId: string) => {
    setActiveWorkoutGroup(muscleGroupId);
  };

  const handleCompleteWorkout = (log: WorkoutLog) => {
    addWorkoutLog(log);
    setActiveWorkoutGroup(null);
    setActiveTab('dashboard');
  };

  const handleCancelWorkout = () => {
    setActiveWorkoutGroup(null);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="gradient-primary w-12 h-12 rounded-full animate-pulse" />
      </div>
    );
  }

  // Active workout view
  if (activeWorkoutGroup) {
    return (
      <div className="min-h-screen bg-background">
        {/* Background glow */}
        <div className="fixed inset-0 gradient-glow opacity-30 pointer-events-none" />
        
        <main className="relative z-10 max-w-lg mx-auto px-4 py-6 pb-24">
          <ActiveWorkout
            muscleGroupId={activeWorkoutGroup}
            userMaxes={userMaxes}
            onComplete={handleCompleteWorkout}
            onCancel={handleCancelWorkout}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow */}
      <div className="fixed inset-0 gradient-glow opacity-30 pointer-events-none" />
      
      <main className="relative z-10 max-w-lg mx-auto px-4 py-6 pb-24">
        {activeTab === 'dashboard' && (
          <Dashboard
            userName={userName}
            recentWorkouts={getRecentWorkouts()}
            totalWorkouts={getTotalWorkouts()}
            thisWeekWorkouts={getThisWeekWorkouts()}
          />
        )}
        
        {activeTab === 'workout' && (
          <WorkoutGenerator
            userMaxes={userMaxes}
            onStartWorkout={handleStartWorkout}
          />
        )}
        
        {activeTab === 'profile' && (
          <ProfileSettings
            userName={userName}
            userMaxes={userMaxes}
            onUpdateName={setUserName}
            onUpdateMax={updateMaxWeight}
          />
        )}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
