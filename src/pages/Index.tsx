import { useState, useEffect } from "react";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { LoginForm } from "@/components/auth/LoginForm";
import { UserProfile } from "@/components/user/UserProfile";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Shield, User, Settings } from "lucide-react";

const DashboardContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDashboard, setSelectedDashboard] = useState("overview");
  const { user, isAdmin } = useUser();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!user) {
    return <AuthWrapper />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader 
        currentTime={currentTime}
        selectedDashboard={selectedDashboard}
        onDashboardChange={setSelectedDashboard}
      />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="data-[state=active]:bg-slate-700">
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <MetricsGrid selectedDashboard={selectedDashboard} />
            <ChartsSection selectedDashboard={selectedDashboard} />
            <AlertsPanel />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <UserProvider>
      <DashboardContent />
    </UserProvider>
  );
};

export default Index;
