import { useState, useEffect } from 'react';
import { UserExerciseMax, WorkoutLog, getDefaultMaxes } from '@/lib/workoutData';

const STORAGE_KEYS = {
  USER_MAXES: 'pump-tracker-maxes',
  WORKOUT_LOGS: 'pump-tracker-logs',
  USER_NAME: 'pump-tracker-name',
};

export function useWorkoutStore() {
  const [userMaxes, setUserMaxes] = useState<UserExerciseMax[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedMaxes = localStorage.getItem(STORAGE_KEYS.USER_MAXES);
    const storedLogs = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
    const storedName = localStorage.getItem(STORAGE_KEYS.USER_NAME);

    if (storedMaxes) {
      setUserMaxes(JSON.parse(storedMaxes));
    } else {
      setUserMaxes(getDefaultMaxes());
    }

    if (storedLogs) {
      setWorkoutLogs(JSON.parse(storedLogs));
    }

    if (storedName) {
      setUserName(storedName);
    }

    setIsLoaded(true);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.USER_MAXES, JSON.stringify(userMaxes));
    }
  }, [userMaxes, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(workoutLogs));
    }
  }, [workoutLogs, isLoaded]);

  useEffect(() => {
    if (isLoaded && userName) {
      localStorage.setItem(STORAGE_KEYS.USER_NAME, userName);
    }
  }, [userName, isLoaded]);

  const updateMaxWeight = (exerciseId: string, weight: number) => {
    setUserMaxes(prev => {
      const existing = prev.find(m => m.exerciseId === exerciseId);
      if (existing) {
        return prev.map(m => m.exerciseId === exerciseId ? { ...m, maxWeight: weight } : m);
      }
      return [...prev, { exerciseId, maxWeight: weight }];
    });
  };

  const addWorkoutLog = (log: WorkoutLog) => {
    setWorkoutLogs(prev => [log, ...prev]);
  };

  const updateWorkoutLog = (id: string, updates: Partial<WorkoutLog>) => {
    setWorkoutLogs(prev => prev.map(log => 
      log.id === id ? { ...log, ...updates } : log
    ));
  };

  const getRecentWorkouts = (limit: number = 5) => {
    return workoutLogs.slice(0, limit);
  };

  const getTotalWorkouts = () => workoutLogs.length;

  const getThisWeekWorkouts = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    return workoutLogs.filter(log => new Date(log.date) >= startOfWeek).length;
  };

  return {
    userMaxes,
    workoutLogs,
    userName,
    setUserName,
    updateMaxWeight,
    addWorkoutLog,
    updateWorkoutLog,
    getRecentWorkouts,
    getTotalWorkouts,
    getThisWeekWorkouts,
    isLoaded,
  };
}
