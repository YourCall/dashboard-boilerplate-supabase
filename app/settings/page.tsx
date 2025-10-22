import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <DashboardLayout userEmail={user.email || ""}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Paramètres</h2>
          <p className="text-muted-foreground">Gérez les paramètres de votre compte et vos préférences</p>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>Informations de votre compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email || ""} disabled />
              <p className="text-xs text-muted-foreground">Votre adresse email ne peut pas être modifiée</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Rôle</Label>
              <Input id="role" value={profile?.role || "user"} disabled />
              <p className="text-xs text-muted-foreground">Votre rôle est défini par l'administrateur</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="created">Compte créé le</Label>
              <Input
                id="created"
                value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString("fr-FR") : "N/A"}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Apparence</CardTitle>
            <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thème</Label>
                <p className="text-sm text-muted-foreground">Choisissez le thème de l'interface</p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
            <CardDescription>Paramètres de sécurité de votre compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Mot de passe</Label>
              <p className="text-sm text-muted-foreground">
                Pour modifier votre mot de passe, déconnectez-vous et utilisez la fonction "Mot de passe oublié" sur la
                page de connexion.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
