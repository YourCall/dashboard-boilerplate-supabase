import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Activity, TrendingUp, Clock } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const stats = [
    {
      title: "Utilisateurs actifs",
      value: "2,543",
      description: "+12% par rapport au mois dernier",
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

  return (
    <DashboardLayout userEmail={user.email || ""}>
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-bold">
            Bienvenue, {user.email?.split("@")[0]} !
          </h2>
          <p className="text-muted-foreground">
            Voici un aperçu de votre dashboard. Rôle :{" "}
            <span className="font-medium">{profile?.role || "user"}</span>
          </p>
        </div>

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
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rôle</span>
                  <span className="text-sm font-medium">
                    {profile?.role || "user"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Créé le</span>
                  <span className="text-sm font-medium">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString("fr-FR")
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
