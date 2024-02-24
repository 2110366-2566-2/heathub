import { NavBar, NavBarMobile } from "../_components/navbar";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-auto flex-row bg-bgColor max-lg:mb-16">
      <NavBar />
      <NavBarMobile />
      {children}
    </div>
  );
}
