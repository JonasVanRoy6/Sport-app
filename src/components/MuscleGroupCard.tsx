import { MuscleGroup } from '@/lib/workoutData';
import { cn } from '@/lib/utils';

interface MuscleGroupCardProps {
  group: MuscleGroup;
  onClick: () => void;
  isSelected?: boolean;
}

export function MuscleGroupCard({ group, onClick, isSelected }: MuscleGroupCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl p-6 text-left transition-all duration-300",
        "bg-card border border-border hover:border-primary/50",
        "hover:scale-[1.02] hover:shadow-card active:scale-100",
        "group cursor-pointer",
        isSelected && "border-primary shadow-glow"
      )}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(ellipse at center, ${group.color}15 0%, transparent 70%)` 
        }}
      />
      
      <div className="relative z-10">
        <span className="text-4xl mb-3 block">{group.icon}</span>
        <h3 className="font-display text-2xl tracking-wide text-foreground">
          {group.name}
        </h3>
      </div>

      {/* Accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ backgroundColor: group.color }}
      />
    </button>
  );
}
