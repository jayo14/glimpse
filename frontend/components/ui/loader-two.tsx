export default function LoaderTwo() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background z-50"
      suppressHydrationWarning
    >
      <div className="relative">
        <div className="h-10 w-10 rounded-full border border-black/20" />
        <div className="absolute inset-0 rounded-full border border-black animate-ping" />
      </div>
    </div>
  );
}
