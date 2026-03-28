import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { adminGetEnrollmentStats } from "@/app/data/admin/admin-get-enrollment-stats";
import { adminGetRecentEnrollments } from "@/app/data/admin/admin-get-recent-enrollments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AnalyticsPage() {
  const enrollmentStats = await adminGetEnrollmentStats();
  const recentEnrollments = await adminGetRecentEnrollments();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <ChartAreaInteractive data={enrollmentStats} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Enrollments & Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={enrollment.User.image ?? ""} />
                        <AvatarFallback>
                          {enrollment.User.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{enrollment.User.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {enrollment.User.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{enrollment.Course.title}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(enrollment.amount / 100)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        enrollment.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : enrollment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(enrollment.createdAt).toLocaleDateString()}
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
