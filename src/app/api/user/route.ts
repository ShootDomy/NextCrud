import { createUser } from "@/actions/user.acction";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, password } = await req.json();
    if (!nombre || !email || !password) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const encriptar = await bcrypt.hash(password, 10);

    const user = await createUser({ nombre, email, password: encriptar });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error al crear usuario:", error);

    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
