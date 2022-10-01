import {
  CalendarIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import WImage from "../../components/Home/WImage";
import Cake from "../../public/birthday-cake.webp";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Event({ params }) {
  const router = useRouter();
  const { id } = router.query;
  const data = useSelector((state) => state.event.value.get(id));
  if (!data) {
    return (
      <Link href={"/create"}>
        <a
          className="bg-envited-400 text-white rounded p-4 font-semibold m-4"
          type="button"
        >
          Kindle create a event
        </a>
      </Link>
    );
  }
  const formatDate = (startsAt) => {
    const date = new Date(startsAt);
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getHours()}:${date.getMinutes()}`;
  };
  const { name, startsAt, locaton } = data;
  console.log(data);
  return (
    <div className="h-screen w-screen bg-[#FBFAFF] ">
      <div className="container flex flex-col-reverse lg:flex-row mx-auto py-0 px-0 md:py-20 lg:px-0 lg:gap-20 lg:justify-around items-center">
        <div className="flex-1 flex flex-col gap-8 p-4 md:w-[500px] lg:max-w-[500px] md:h-[500px]">
          <div>
            <p className="text-envited-400 text-4xl sm:text-5xl md:text-5xl font-bold mb-2">
              Birthday Bash
            </p>
            <span className="text-[#828282] text-lg">
              Hosted by <span className="font-semibold">{name} </span>
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-[20px] cursor-pointer w-full">
              <div className="p-4 event-icon bg-white h-fit">
                <CalendarIcon
                  className="text-envited-300 h-6 w-6"
                  color={"#8456EC"}
                />
              </div>
              <div className="text-md md:text-lg">
                <p className="text-envited-400 font-semibold">
                  {formatDate(startsAt)}
                </p>
                <p className="text-[#4F4F4F]">
                  to&nbsp;
                  <span className="font-semibold">
                    {formatDate(startsAt)}&nbsp;
                  </span>
                </p>
              </div>
            </div>
            <ChevronRightIcon className="text-[#BDBDBD] h-6 w-6 self-center" />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-[20px] cursor-pointer w-full">
              <div className="p-4 event-icon bg-white h-fit">
                <MapPinIcon
                  className="text-envited-300 h-6 w-6"
                  color={"#8456EC"}
                />
              </div>
              <div className="text-md md:text-lg">
                <p className="text-envited-400 font-semibold">Street Name</p>
                <p className="text-[#4F4F4F]">{locaton || "Not listed"}</p>
              </div>
            </div>
            <ChevronRightIcon className="text-[#BDBDBD] h-6 w-6 self-center" />
          </div>
        </div>
        <div className="w-full max-w-[500px] md:flex-1 md:w-[500px]  md:h-[500px]">
          <div className=" self-center">
            <WImage layout="responsive" src={Cake} />
          </div>
        </div>
      </div>
    </div>
  );
}
