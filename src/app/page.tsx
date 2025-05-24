import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-8">
      <Card className="w-full max-w-2xl shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6 sm:p-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 2.5 1.2 4.8 3 6.2V22h10v-5.8c1.8-1.4 3-3.7 3-6.2Z"/>
              <path d="M12 2a3 3 0 0 0-3 3c0 .4.1.9.3 1.3"/>
              <path d="M12 12a2.5 2.5 0 0 0 0-5"/>
            </svg>
          </div>
          <CardTitle className="text-4xl sm:text-5xl font-bold">Welcome to MesaFacil</CardTitle>
          <CardDescription className="text-primary-foreground/90 text-lg sm:text-xl mt-2">
            Your seamless solution for restaurant management.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-6">
          <p className="text-center text-lg text-foreground/80">
            Navigate through your restaurant's operations with ease. Manage tables, browse products, and track orders all in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/tables" passHref>
              <Button variant="outline" className="w-full h-12 text-lg bg-accent/10 hover:bg-accent/20 border-accent text-accent-foreground hover:text-accent-foreground">
                View Tables <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products" passHref>
              <Button variant="outline" className="w-full h-12 text-lg bg-accent/10 hover:bg-accent/20 border-accent text-accent-foreground hover:text-accent-foreground">
                Browse Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Get started by exploring the available tables or checking out the product catalog.
          </p>
        </CardContent>
      </Card>
      <footer className="mt-12 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MesaFacil. All rights reserved.</p>
      </footer>
    </div>
  );
}
