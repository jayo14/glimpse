export default function LoaderOne() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background z-50"
      suppressHydrationWarning
    >
      <div className="flex gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-black animate-bounce" />
        <div
          className="h-2.5 w-2.5 rounded-full bg-black animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="h-2.5 w-2.5 rounded-full bg-black animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
