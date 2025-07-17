import { useState, useEffect } from "react";
import { HabitCard } from "@/components/HabitCard";
import { StatsCard } from "@/components/StatsCard";
import { AddHabitDialog } from "@/components/AddHabitDialog";
import { Calendar, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  color: string;
  completedDates: string[];
}

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Drink 8 glasses of water",
      streak: 5,
      completed: true,
      color: "bg-blue-500",
      completedDates: []
    },
    {
      id: "2", 
      name: "Exercise for 30 minutes",
      streak: 3,
      completed: false,
      color: "bg-green-500",
      completedDates: []
    },
    {
      id: "3",
      name: "Read for 20 minutes",
      streak: 8,
      completed: true,
      color: "bg-purple-500",
      completedDates: []
    },
    {
      id: "4",
      name: "Meditate for 10 minutes",
      streak: 0,
      completed: false,
      color: "bg-orange-500",
      completedDates: []
    }
  ]);

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
  const currentStreak = Math.max(...habits.map(h => h.streak));

  const handleToggleHabit = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        return {
          ...habit,
          completed: newCompleted,
          streak: newStreak
        };
      }
      return habit;
    }));
  };

  const handleAddHabit = (name: string, color: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      streak: 0,
      completed: false,
      color,
      completedDates: []
    };
    setHabits([...habits, newHabit]);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Habit Tracker</h1>
              <p className="text-muted-foreground mt-1">{getCurrentDate()}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Stats Section */}
          <div className="animate-fade-in">
            <StatsCard
              completedToday={completedToday}
              totalHabits={totalHabits}
              currentStreak={currentStreak}
              completionRate={completionRate}
            />
          </div>

          {/* Habits Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Today's Habits</h2>
              <AddHabitDialog onAddHabit={handleAddHabit} />
            </div>

            {habits.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No habits yet</h3>
                <p className="text-muted-foreground mb-6">Start building your routine by adding your first habit!</p>
                <AddHabitDialog onAddHabit={handleAddHabit} />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {habits.map((habit, index) => (
                  <div 
                    key={habit.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <HabitCard
                      habit={habit}
                      onToggle={handleToggleHabit}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Motivational Section */}
          {completionRate === 100 && totalHabits > 0 && (
            <div className="text-center py-8 animate-fade-in">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Perfect Day!</h3>
              <p className="text-lg text-muted-foreground">You've completed all your habits today. Amazing work!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
