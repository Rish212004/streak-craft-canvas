import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const HABIT_COLORS = [
  "bg-blue-500",
  "bg-green-500", 
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-yellow-500",
  "bg-red-500"
];

interface AddHabitDialogProps {
  onAddHabit: (name: string, color: string) => void;
}

export function AddHabitDialog({ onAddHabit }: AddHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAddHabit(habitName.trim(), selectedColor);
      setHabitName("");
      setSelectedColor(HABIT_COLORS[0]);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-accent hover:shadow-medium">
          <Plus className="h-4 w-4 mr-2" />
          Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="habitName">Habit Name</Label>
            <Input
              id="habitName"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="e.g. Drink 8 glasses of water"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Choose Color</Label>
            <div className="grid grid-cols-4 gap-3">
              {HABIT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full ${color} transition-all duration-200 hover:scale-110 ${
                    selectedColor === color 
                      ? "ring-4 ring-primary ring-offset-2" 
                      : "hover:ring-2 hover:ring-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-primary hover:shadow-medium"
              disabled={!habitName.trim()}
            >
              Add Habit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}