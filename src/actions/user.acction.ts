"use server";

import prisma from "@/lib/prisma";

/**
 * Crear usuario
 *  * @param data
 * @returns
 */
export async function createUser({
  nombre,
  email,
  password,
}: {
  nombre: string;
  email: string;
  password: string;
}) {
  return await prisma.user.create({
    data: { nombre, email, password },
  });
}

export async function loginUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

/**
 * Obterer todos los usuarios activos
 * @returns
 */
export async function getAllUsers() {
  return await prisma.user.findMany({
    where: { deleted_at: null },
    include: { plants: true },
  });
}

/**
 * ACtualizar usuario
 * @param userId
 * @param data
 * @returns
 */
export async function updateUser(
  userId: string,
  data: { nombre?: string; email?: string; password?: string }
) {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
}

/**
 * Eliminar usuario
 * @param userId
 * @returns
 */
export async function softDeleteUser(userId: string) {
  return await prisma.user.update({
    where: { id: userId },
    data: { deleted_at: new Date() },
  });
}

/**
 *
 * @param userId
 * @returns
 */
export async function getUserDetails(userId: string | undefined) {
  if (!userId) return null;
  return await prisma.user.findUnique({
    where: { id: userId, deleted_at: null },
    include: { plants: true },
  });
}
