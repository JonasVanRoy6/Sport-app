import { Home, Dumbbell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Tab = 'dashboard' | 'workout' | 'profile';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'dashboard' as Tab, icon: Home, label: 'Home' },
    { id: 'workout' as Tab, icon: Dumbbell, label: 'Workout' },
    { id: 'profile' as Tab, icon: User, label: 'Profiel' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-200",
                  isActive && "gradient-primary shadow-glow"
                )}>
                  <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive && "text-primary-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-xs mt-1 font-medium transition-colors",
                  isActive && "text-primary"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Safe area for mobile */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
}
