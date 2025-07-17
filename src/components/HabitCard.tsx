import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Flame, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  color: string;
}

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
}

export function HabitCard({ habit, onToggle }: HabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!habit.completed) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    onToggle(habit.id);
  };

  return (
    <Card className={cn(
      "p-6 transition-all duration-300 hover:shadow-medium border-2",
      habit.completed 
        ? "border-success bg-success-soft shadow-success" 
        : "border-border hover:border-primary/30",
      isAnimating && "animate-habit-complete"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className={cn(
              "w-3 h-3 rounded-full",
              habit.color
            )} 
          />
          <h3 className="font-semibold text-lg text-foreground">{habit.name}</h3>
        </div>
        <Button
          variant={habit.completed ? "default" : "outline"}
          size="sm"
          onClick={handleToggle}
          className={cn(
            "w-10 h-10 rounded-full p-0 transition-all duration-300",
            habit.completed 
              ? "bg-gradient-success hover:shadow-success" 
              : "hover:border-success hover:text-success"
          )}
        >
          <Check className={cn(
            "h-5 w-5 transition-all duration-300",
            habit.completed ? "scale-100" : "scale-0"
          )} />
        </Button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Target className="h-4 w-4" />
          <span>Daily Goal</span>
        </div>
        {habit.streak > 0 && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            "bg-gradient-streak text-streak-foreground animate-fade-in"
          )}>
            <Flame className="h-3 w-3" />
            <span>{habit.streak} day{habit.streak !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      
      {habit.completed && (
        <div className="mt-3 text-xs text-success font-medium animate-slide-up">
          ✨ Great job! Keep it up!
        </div>
      )}
    </Card>
  );
}