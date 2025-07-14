'use client'
export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center mt-24  p-4">
      <h1 className="my-5 text-2xl">Something went wrong.</h1>
      <p>{error.message}</p>
    </div>
  );
}
