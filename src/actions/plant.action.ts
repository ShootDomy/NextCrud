import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.acction";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: string) {
  try {
    const userId = await getUserId();

    const whereClause: {
      userId: string | null;
      name?: {
        contains: string;
        mode: "insensitive";
      };
    } = {
      userId: userId ?? null,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plant.findMany({
      where: whereClause,
    });

    revalidatePath("/plants");

    return userPlants;
  } catch (error) {
    console.log("Error==>>>", error);
    throw new Error("Failed to fetch plants");
  }
}

// export async function createPlant(plant: any) {
//   try {
//     const userId = await getUserId();

//     const newPlant = await prisma.plant.create({
//       data: {
//         name: plant.name,
//         userId: userId,
//       },
//     });

//     revalidatePath("/plants");

//     return newPlant;
//   } catch (error) {
//     console.log("Error==>>>", error);
//     throw new Error("Failed to create plant");
//   }
// }
