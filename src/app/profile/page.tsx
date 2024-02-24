import { serverapi } from "@/trpc/server";
import { redirect } from "next/navigation";
import { TagList } from "@/utils/icon-mapping";
import ProfileContainer, {
  ProfilePreviewProps,
} from "./_components/profile-container";

export default async function Profile() {
  const user2 = await serverapi.auth.me.query();
  const user = await serverapi.auth.getUserPublicData.query({
    userID: user2?.userId ?? "",
  });
  if (!user) {
    redirect("/");
  }
  const nowDate = new Date();
  const birthDate = user.dateOfBirth ?? new Date();
  const userAge =
    nowDate.getFullYear() -
    birthDate.getFullYear() -
    (nowDate <
    new Date(nowDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())
      ? 1
      : 0);
  let show: ProfilePreviewProps;
  if (user.role == "host") {
    const hostData = await serverapi.auth.getHostData.query({
      hostID: user2?.userId ?? "",
    });
    show = {
      name: user.aka,
      age: userAge,
      image: user.profileImageURL ?? "/images/discover/mock-profile/mock-1.jpg",
      rating: (hostData[0] ?? { avgRating: 0 }).avgRating ?? 0,
      reviews: (hostData[0] ?? { reviewCount: 0 }).reviewCount ?? 0,
      interests: (hostData[0] ?? { interests: [] }).interests as TagList,
      email: user.email,
      about: user.bio ?? "",
      balance: 9999,
    };
  } else {
    show = {
      name: user.aka,
      age: userAge,
      image: user.profileImageURL ?? "/images/discover/mock-profile/mock-1.jpg",
      rating: -1,
      reviews: -1,
      interests: [] as TagList,
      email: user.email,
      about: user.bio ?? "",
      balance: 9999,
    };
  }
  console.log(show);
  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-6 lg:p-9">
      <ProfileContainer {...show} />
    </div>
  );
}
