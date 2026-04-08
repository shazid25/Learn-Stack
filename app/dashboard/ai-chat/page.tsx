import DashboardChat from "./_components/DashboardChat";

export default function AIChatPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          AI <span className="text-blue-600">Assistant</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
          Your personal learning companion for any questions.
        </p>
      </div>
      
      <DashboardChat />
    </div>
  );
}
