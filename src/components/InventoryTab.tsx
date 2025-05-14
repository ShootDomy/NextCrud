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

const plantas = [
  {
    id: "afdasff",
    nombre: "Hola",
    categoria: "PLanta",
    price: 12.5,
    stock: 2,
  },
];

export default function InventoryTab() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-2">
        <div className="relative max-w-sm w-full">
          <Input placeholder="Buscar" className="pl-10" />

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
          {plantas.map((planta) => (
            <TableRow key={planta.id}>
              <TableCell>{planta.nombre}</TableCell>
              <TableCell>{planta.categoria}</TableCell>
              <TableCell>{planta.price}</TableCell>
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
