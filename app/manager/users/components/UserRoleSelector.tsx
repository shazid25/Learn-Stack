"use client";

import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { UserRole } from "@/lib/generated/prisma";
import { managerUpdateRole } from "@/app/data/manager/manager-update-role";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface UserRoleSelectorProps {
  userId: string;
  currentRole: string;
}

export function UserRoleSelector({ userId, currentRole }: UserRoleSelectorProps) {
  const [loading, setLoading] = useState(false);

  const onRoleChange = async (newRole: string) => {
    setLoading(true);
    try {
      const result = await managerUpdateRole(userId, newRole as any);
      if (result.success) {
        toast.success("User role updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update user role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select 
        defaultValue={currentRole} 
        onValueChange={onRoleChange}
        disabled={loading}
      >
        <SelectTrigger className="w-[130px] h-9">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
      {loading && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
    </div>
  );
}
