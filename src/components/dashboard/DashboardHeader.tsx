
import { Monitor, Activity, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  currentTime: Date;
  selectedDashboard: string;
  onDashboardChange: (dashboard: string) => void;
}

export const DashboardHeader = ({ currentTime, selectedDashboard, onDashboardChange }: DashboardHeaderProps) => {
  const dashboards = [
    { id: "overview", label: "Overview", icon: Monitor },
    { id: "performance", label: "Performance", icon: Activity },
    { id: "analytics", label: "Analytics", icon: ChartBar }
  ];

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h1 className="text-2xl font-bold text-white">Live Dashboard</h1>
            </div>
            
            <nav className="flex space-x-2">
              {dashboards.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={selectedDashboard === id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onDashboardChange(id)}
                  className={`text-white hover:bg-slate-700 ${
                    selectedDashboard === id ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </nav>
          </div>

          <div className="text-sm text-slate-300">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </header>
  );
};
