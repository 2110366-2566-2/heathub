import { NavBar, NavBarMobile } from "../_components/navbar";

export default function MyEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-auto flex-row bg-bgColor">
      <NavBar />
      <NavBarMobile />
      {children}
    </div>
  );
}
