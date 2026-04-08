import { managerGetUsers } from "@/app/data/manager/manager-get-users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserRoleSelector } from "./components/UserRoleSelector";

export default async function ManagerUsersPage() {
  const users = await managerGetUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">User Management</h1>
        <p className="text-slate-500 font-medium">Manage user roles and platform access permissions.</p>
      </div>
      
      <Card className="border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <CardTitle>Platform Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-black px-6">User</TableHead>
                <TableHead className="font-black">Email</TableHead>
                <TableHead className="font-black">Current Role</TableHead>
                <TableHead className="font-black">Change Role</TableHead>
                <TableHead className="font-black text-right px-6">Joined At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm">
                        <AvatarImage src={user.image ?? ""} />
                        <AvatarFallback className="bg-blue-600/10 text-blue-600 font-bold">
                          {user.name?.charAt(0) ?? user.email.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-slate-900 dark:text-slate-200">{user.name || "Anonymous"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 font-medium">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : user.role === "manager" ? "secondary" : "outline"} className="capitalize font-bold px-3 py-1 rounded-full">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <UserRoleSelector userId={user.id} currentRole={user.role} />
                  </TableCell>
                  <TableCell className="text-right px-6 text-slate-400 font-medium whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
