import GoBackArrow from "../register/_components/goBackArrow";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100vh] w-[100vw] bg-primary-50">
      <GoBackArrow />
      {children}
    </div>
  );
}
