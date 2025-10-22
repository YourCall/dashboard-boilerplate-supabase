import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Dashboard Boilerplate</CardTitle>
            <CardDescription>Application de dashboard avec authentification Supabase</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild size="lg">
              <Link href="/login">Se connecter</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/signup">Créer un compte</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
