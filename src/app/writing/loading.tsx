export default function LoadingWritingPage() {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="container-max space-y-8">
        <div className="h-12 w-72 rounded bg-white/10 animate-pulse" />
        <div className="h-5 w-full max-w-2xl rounded bg-white/10 animate-pulse" />
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-44 rounded-xl bg-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
