export default function LoadingProjectsPage() {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="container-max space-y-8">
        <div className="h-12 w-64 rounded bg-white/10 animate-pulse" />
        <div className="h-5 w-full max-w-2xl rounded bg-white/10 animate-pulse" />
        <div className="h-10 w-full max-w-3xl rounded-full bg-white/10 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-72 rounded-xl bg-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
