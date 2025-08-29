import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Doc } from "convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface UsersCardProps {
  user: Doc<"users">;
}

export function UsersCard({ user }: UsersCardProps) {
  const users = useQuery(api.users.list);
  const deleteUsers = useMutation(api.users.remove);
  const [isDeleting, setIsDeleteting] = useState(false);

  const handleDelete = async (user: Doc<"users">) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setIsDeleteting(true);
      try {
        await deleteUsers({id: user._id});
      }catch(error){
         console.error("Failed to delete user:", error);
      }finally{
        setIsDeleteting(false);
      }
    }
  };

  if (users === undefined) {
    return <p className="text-gray-500">Carregando usuários...</p>;
  }

  if (users.length === 0) {
    return <p className="text-gray-500">Nenhum usuário encontrado.</p>;
  }

  return (
    <div className="p-4">
      <Table>
        <TableCaption>Users Registered</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="text-left">{user.name}</TableCell>
              <TableCell>@{user.userName}</TableCell>
              <TableCell> <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(user)}
              disabled={isDeleting}
              className="bg-blue-500 text-white"
            >
              <Trash2 className="h-4 w-4" />
            </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
