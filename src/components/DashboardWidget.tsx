import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardWidgetProps {
  title: string;
  urgency: "critical" | "important" | "operational" | "info";
  items: Array<{
    id: string;
    label: string;
    value: string;
    subtext?: string;
    action?: () => void;
    actionLabel?: string;
  }>;
  icon: LucideIcon;
  total?: string;
  subtitle?: string;
}

const urgencyConfig = {
  critical: {
    badge: "🔴 Critical",
    bgClass: "bg-critical/10 border-critical/20",
    textClass: "text-critical",
  },
  important: {
    badge: "🟡 This Week",
    bgClass: "bg-important/10 border-important/20",
    textClass: "text-important",
  },
  operational: {
    badge: "🟠 Today",
    bgClass: "bg-operational/10 border-operational/20",
    textClass: "text-operational",
  },
  info: {
    badge: "🟢 Info",
    bgClass: "bg-info border-info",
    textClass: "text-info-foreground",
  },
};

export const DashboardWidget = ({
  title,
  urgency,
  items,
  icon: Icon,
  total,
  subtitle,
}: DashboardWidgetProps) => {
  const config = urgencyConfig[urgency];

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", config.bgClass)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={cn("w-5 h-5", config.textClass)} />
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            {total && (
              <p className={cn("text-2xl font-bold", config.textClass)}>{total}</p>
            )}
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <Badge variant="outline" className="whitespace-nowrap">
            {config.badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{item.label}</p>
                {item.subtext && (
                  <p className="text-sm text-muted-foreground truncate">{item.subtext}</p>
                )}
              </div>
              <div className="flex items-center gap-3 ml-3">
                <p className="font-bold text-foreground whitespace-nowrap">{item.value}</p>
                {item.action && item.actionLabel && (
                  <Button size="sm" variant="outline" onClick={item.action}>
                    {item.actionLabel}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
