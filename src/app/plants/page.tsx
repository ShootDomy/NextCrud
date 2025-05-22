"use client";
import AuthForm from "@/components/AuthForm";
import InventoryTab from "@/components/InventoryTab";
import { useSession } from "next-auth/react";
import React from "react";

function Page() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTab />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          {" "}
          <AuthForm />
        </div>
      )}
    </>
  );
}

export default Page;
