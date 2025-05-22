"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon, LogInIcon, LogOutIcon, Sprout } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useSession, signIn, signOut } from "next-auth/react";
// import { stackServerApp } from "@/stack";

function Navbar() {
  // const user = await stackServerApp.getUser();
  // const app = stackServerApp.urls;
  // const userProfile = await getUserDetails(user?.id);
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/*Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold font-mono tracking-wider"
            >
              🌱 Inventario
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>

            {/*Tema*/}
            <ModeToggle />
            {session?.user ? (
              <>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {session.user.nombre}
                </span>
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span className="hidden lg:inline">Cerrar Sesión</span>
                </Button>
                {/* Puedes mostrar el nombre del usuario si quieres */}
              </>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => signIn(undefined, { callbackUrl: "/login" })}
              >
                <LogInIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Inicio Sesión</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
