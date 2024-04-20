import { serverapi } from "@/trpc/server";
import { type TagList } from "@/utils/icon-mapping";
import { redirect } from "next/navigation";
import ProfileContainer, {
  type ProfilePreviewProps,
} from "./_components/profile-container";

export default async function Profile() {
  const user2 = await serverapi.auth.me.query();
  const user = await serverapi.user.getUserPublicData.query({
    userID: user2?.userId ?? "",
  });

  if (!user) {
    redirect("/");
  }
  const balance = await serverapi.profile.balance.query();
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
    const hostData = await serverapi.user.getHostData.query({
      hostID: user2?.userId ?? "",
    });
    const verifiedData = await serverapi.profile.getHostVerifiedRequest.query();
    show = {
      name: user.aka,
      age: userAge,
      image: user.profileImageURL ?? "/images/discover/mock-profile/mock-1.jpg",
      rating: (hostData[0] ?? { avgRating: 0 }).avgRating ?? 0,
      reviews: (hostData[0] ?? { reviewCount: 0 }).reviewCount ?? 0,
      interests: (hostData[0] ?? { interests: [] }).interests as TagList,
      email: user.email,
      about: user.bio ?? "",
      balance: balance / 100,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth ?? new Date(),
      id: user2?.userId ?? "",
      verifiedStatus: verifiedData?.status ?? "unverified",
      verifiedDetail: verifiedData?.requestDetails ?? "",
      role:
        user2?.role === "admin" ? "participant" : user2?.role ?? "participant",
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
      balance: balance / 100,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth ?? new Date(),
      id: user2?.userId ?? "",
      verifiedStatus: null,
      verifiedDetail: "",
      role:
        user2?.role === "admin" ? "participant" : user2?.role ?? "participant",
    };
  }
  console.log(show);
  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-6 lg:p-9">
      <ProfileContainer {...show} />
    </div>
  );
}
