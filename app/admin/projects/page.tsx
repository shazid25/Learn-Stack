import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconFolderCode } from "@tabler/icons-react";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Projects Management</h1>
      
      <Card className="flex flex-col items-center justify-center py-20 text-center">
        <CardHeader>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <IconFolderCode className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="mt-4 text-xl">Project Showcase coming soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="max-w-md text-muted-foreground">
            The project management system is currently under development. This feature will allow students to submit their projects and admins to review and grade them.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
