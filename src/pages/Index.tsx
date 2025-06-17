
import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDashboard, setSelectedDashboard] = useState("overview");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader 
        currentTime={currentTime}
        selectedDashboard={selectedDashboard}
        onDashboardChange={setSelectedDashboard}
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <MetricsGrid selectedDashboard={selectedDashboard} />
        <ChartsSection selectedDashboard={selectedDashboard} />
        <AlertsPanel />
      </main>
    </div>
  );
};

export default Index;
