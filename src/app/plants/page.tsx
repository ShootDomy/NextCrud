import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import React from "react";

async function page() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <>
      {user ? (
        <h1> Tabla de inventario</h1>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          {" "}
          <SignUp />
        </div>
      )}
    </>
  );
}

export default page;
