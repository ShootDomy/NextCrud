"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combobox";
import { useState } from "react";
import { getPlants } from "@/actions/plant.action";

// const plantas = [
//   {
//     id: "afdasff",
//     nombre: "Hola",
//     categoria: "PLanta",
//     price: 12.5,
//     stock: 2,
//   },
// ];

type Planta = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTabProps {
  plantas: Planta;
}

export default function InventoryTab({ plantas }: InventoryTabProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filterPlants = plantas?.filter(
    (plant) =>
      plant.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.categoria === selectedCategory)
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-2">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Buscar"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
          <Combobox
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Planta Id</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Precio</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterPlants.map((planta) => (
            <TableRow key={planta.id}>
              <TableCell>{planta.nombre}</TableCell>
              <TableCell>{planta.categoria}</TableCell>
              <TableCell>{planta.precio}</TableCell>
              <TableCell className="font-bold">{planta.stock}</TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end space-x-4">
                  <h1>Editar</h1>
                  <h1>Eliminar</h1>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
