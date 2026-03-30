import "server-only"
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetDashobardStats() {
    await requireAdmin()

    const [totalSignups, totalCustomers, totalCourses, totalLessons, totalEarningsData] = await Promise.all([
        //total signups
        prisma.user.count(),

        //total customers
         prisma.user.count({
             where:{
                 enrollment:{
                    some:{}
                 }
             }
         }),

         //total courses
         prisma.course.count(),

         //total lessons
         prisma.lesson.count(),

         //total earnings - sum all Active enrollment amounts
         prisma.enrollment.aggregate({
             where:{
                 status: "Active",
                 amount: {
                     gt: 0  // Only count positive amounts
                 }
             },
             _sum:{
                 amount: true
             }
         })
    ])

    const totalEarnings = totalEarningsData._sum.amount ?? 0

    return {
        totalSignups,
        totalCustomers,
        totalCourses,
        totalLessons,
        totalEarnings
    }
}
