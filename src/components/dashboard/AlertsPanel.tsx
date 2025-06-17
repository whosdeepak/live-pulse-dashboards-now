
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      title: "High CPU Usage Detected",
      description: "CPU usage has exceeded 80% for the last 5 minutes",
      severity: "warning",
      timestamp: "2 minutes ago"
    },
    {
      id: 2,
      title: "Database Connection Lost",
      description: "Unable to connect to primary database server",
      severity: "critical",
      timestamp: "5 minutes ago"
    },
    {
      id: 3,
      title: "Disk Space Low",
      description: "Available disk space is below 15%",
      severity: "warning",
      timestamp: "10 minutes ago"
    },
    {
      id: 4,
      title: "New User Milestone",
      description: "Congratulations! You've reached 10,000 users",
      severity: "info",
      timestamp: "1 hour ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "warning": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "info": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Activity className="w-5 h-5" />
          <span>Recent Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-4 p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">{alert.title}</h4>
                <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-sm text-slate-300">{alert.description}</p>
              <p className="text-xs text-slate-400">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
