export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main className="w-full flex justify-center p-8">
      <div className="container">{children}</div>
    </main>
  );
}
