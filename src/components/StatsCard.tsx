import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Calendar, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  completedToday: number;
  totalHabits: number;
  currentStreak: number;
  completionRate: number;
}

export function StatsCard({ 
  completedToday, 
  totalHabits, 
  currentStreak, 
  completionRate 
}: StatsCardProps) {
  const progress = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-primary text-primary-foreground">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Today's Progress</h2>
          <p className="text-primary-foreground/80">Keep building those habits!</p>
        </div>
        <Trophy className="h-8 w-8 text-accent" />
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completed</span>
            <span>{completedToday}/{totalHabits}</span>
          </div>
          <div className="w-full bg-primary-foreground/20 rounded-full h-3">
            <div 
              className={cn(
                "h-3 rounded-full transition-all duration-500 ease-out",
                progress === 100 ? "bg-gradient-accent" : "bg-white"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <div className="text-2xl font-bold">{currentStreak}</div>
            <div className="text-xs text-primary-foreground/80">Day Streak</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
            <div className="text-xs text-primary-foreground/80">Success Rate</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div className="text-2xl font-bold">{totalHabits}</div>
            <div className="text-xs text-primary-foreground/80">Total Habits</div>
          </div>
        </div>
      </div>
    </Card>
  );
}