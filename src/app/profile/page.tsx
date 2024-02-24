import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";
import { TagList } from "@/utils/icon-mapping";
import ProfileContainer from "./_components/profile-container";

export default async function SignIn() {
  const user2 = await serverapi.auth.me.query();
  const user = await serverapi.auth.getUserPublicData.query({
    userID: user2?.userId ?? "",
  });
  console.log("\n\n", user, "\n\n");
  if (!user) {
    redirect("/");
  }

  const show = {
    name: "BOBOBO",
    age: 22,
    image: "/images/discover/mock-profile/mock-1.jpg",
    rating: 4.5,
    reviews: 10,
    interests: ["Arts", "Camping", "Basketball"] as TagList,
    email: "peetwin011@hotmail.co.th",
    about:
      "I love to travel and explore new places. I'm looking for a travel buddy to go on a road trip with me to the Grand Canyon!",
  };
  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-6 lg:p-9">
      <ProfileContainer {...show} />
    </div>
    // <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    //   <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
    //     <h1>YOUR PROFILE</h1>
    //     <div className="flex flex-col gap-4">
    //       <p>
    //         name: {user.firstName} {user.lastName}
    //       </p>
    //       <p>username: {user.userName}</p>
    //       <p>email: {user.email}</p>
    //       <p>id: {user.userId}</p>
    //       <p>gender: {user.gender}</p>
    //     </div>
    //   </div>
    // </main>
  );
}
