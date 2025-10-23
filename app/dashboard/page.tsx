"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Activity, TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { ConfigurationBlock } from "@/components/dashboard/configuration-block";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState("");
  const [baseUrl, setBaseUrl] = useState("api.yourcall.ai");
  const [agents, setAgents] = useState<any>([]);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, [supabase, router]);

  const stats = [
    {
      title: "Agents",
      value: agents.length || 0,
      description: "Nombre d'agents",
      icon: Users,
    },
    {
      title: "Activité",
      value: "89%",
      description: "Taux d'engagement",
      icon: Activity,
    },
    {
      title: "Croissance",
      value: "+23%",
      description: "Augmentation ce mois-ci",
      icon: TrendingUp,
    },
    {
      title: "Temps moyen",
      value: "4.2h",
      description: "Par session utilisateur",
      icon: Clock,
    },
  ];

  const fetchData = async () => {
    // const { data, error } = await supabase.from("data").select("*");
    loadAgents();
    // if (error) {
    //   console.error(error);
    // }
    // console.log(data);
  };

  const loadAgents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://${baseUrl}/agents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.data || !Array.isArray(result.data)) {
        throw new Error("Invalid response format for agents");
      }

      setAgents(result.data);
    } catch (err) {
      console.error("[v0] Error loading agents:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userEmail={user?.email || ""}>
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-bold">
            Bienvenue, {user?.email?.split("@")[0]} !
          </h2>
        </div>
        <ConfigurationBlock
          jwtToken={jwtToken}
          setJwtToken={setJwtToken}
          baseUrl={baseUrl}
          setBaseUrl={setBaseUrl}
          onAnalyze={fetchData}
          loading={loading}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>
                Vos dernières actions sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Connexion réussie", time: "Il y a 2 minutes" },
                  { action: "Profil mis à jour", time: "Il y a 1 heure" },
                  { action: "Nouveau projet créé", time: "Il y a 3 heures" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <span className="text-sm">{item.action}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
              <CardDescription>Détails de votre profil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rôle</span>
                  <span className="text-sm font-medium">
                    {user?.role || "user"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Créé le</span>
                  <span className="text-sm font-medium">
                    {user?.created_at
                      ? new Date(user?.created_at).toLocaleDateString("fr-FR")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
