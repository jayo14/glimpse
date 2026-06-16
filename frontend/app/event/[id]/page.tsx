export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-serif">Event {params.id}</h1>
      <p className="mt-4 font-sans text-muted-foreground">Gallery coming soon.</p>
    </div>
  );
}
