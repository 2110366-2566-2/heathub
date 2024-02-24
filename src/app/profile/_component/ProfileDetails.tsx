import { Tag } from "@/app/_components/tag";
import { CardContent, Card } from "@/components/ui/card";
import { serverapi } from "@/trpc/server";
import { type TagList, tagIcon } from "@/utils/icon-mapping";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";
import EditProfileButton from "./EditProfileButton";

interface ProfileDetailsProps {
  interests: TagList;
}
export default async function ProfileDetails(props: ProfileDetailsProps) {
  const { interests } = props;
  const user = await serverapi.auth.me.query();
  if (!user) {
    redirect("/");
  }
  return (
    <Card className="h-fit min-h-[334px] w-full min-w-fit max-w-[912px] justify-center rounded-none bg-white p-5 md:min-h-[256px] md:rounded-3xl md:border-solid md:border-primary-300">
      <CardContent className="flex h-full w-full flex-col items-center gap-y-4 p-0 md:gap-0">
        <div className="h-max-[128px] flex h-fit w-full flex-row gap-x-6 md:h-[124px]">
          <div className="flex h-full w-full flex-row gap-4">
            <div className="relative h-[100px] w-[100px] flex-none rounded-full bg-slate-400">
              <div className="absolute bottom-0 right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-neutral-500 bg-neutral-50 p-1 text-neutral-500">
                <FontAwesomeIcon icon={faEye} />
              </div>
            </div>
            <div className="flex h-fit w-full flex-col gap-y-2">
              <div className="h3 font-bold text-purple-900">{`${user.userName}, 17`}</div>
              <div className="flex h-fit w-full flex-col gap-y-1">
                <div className="h5 flex h-6 flex-row items-center gap-x-1 text-medium">
                  <div className="flex h-[18px] flex-row items-center gap-x-2">
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                  </div>
                  <div>•</div>
                  <div className="flex h-[18px] flex-row items-center gap-x-2">
                    <div>{user.gender}</div>
                  </div>
                </div>
                <div className="h5 line-clamp-3 w-full text-placeholder md:line-clamp-2">
                  {
                    "Let's make memories together and see where the journey takes us!"
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="hidden h-full w-fit md:flex">
            <EditProfileButton
              cUsername={user.userName}
              cGender={user.gender}
              cBio={""}
              cDOB={new Date()}
              cProfileURL={""}
            />
          </div>
        </div>
        <div className="flex h-fit min-h-[94px] w-full flex-col gap-y-3">
          <div className="h6 font-bold text-medium">Interest</div>
          <div className="flex h-fit w-full flex-row flex-wrap gap-2">
            {interests.map((tag) => (
              <Tag key={tag} variant="outline" icon={tagIcon[tag]} size="md">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex h-10 w-full md:hidden">
          <EditProfileButton
            cUsername={user.userName}
            cGender={user.gender}
            cBio={""}
            cDOB={new Date()}
            cProfileURL={""}
          />
        </div>
      </CardContent>
    </Card>
  );
}
