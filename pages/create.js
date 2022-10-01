import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import WImage from "../components/Home/WImage";
import UploadPhoto from "../public/upload-photo.webp";
import Camera from "../public/camera.svg";
import { useDispatch } from "react-redux";
import { createEvent } from "../eventSlice";
import { useRouter } from "next/router";

export default function Create() {
  const {
    register,
    handleSubmit,
  } = useForm();
  const {
    name: photoName,
    onChange: onPhotoChange,
    onBlur: onPhotoBlur,
    ref: photoRef,
  } = register("photo");
  const router = useRouter();
  const fileRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const id = Date.now();
    dispatch(
      createEvent(
        Object.assign(
          {},
          data,
          { id: id },
          { photo: selectedFile ? selectedFile : null }
        )
      )
    );
    router.push(`/event/${id}`);
  };
  const setSelectedPhoto = (e) => {
    const value = e.target.files;
    if (value.length > 0) {
      const pic = value[0];
      const objectUrl = URL.createObjectURL(pic);
      setSelectedFile(objectUrl);
    }
  };
  return (
    <div className="container mx-auto py-8 px-4 md:py-10 md:px-0">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-envited-400 text-3xl sm:text-4xl md:text-5xl font-semibold mb-8">
            Create your event
          </p>

          <form
            className="grid md:grid-cols-2 md:gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="order-1">
              <p className="input-label">🎉 My event is called</p>
              <input
                type="text"
                placeholder="Type here"
                {...register("name", { required: true })}
              />
              <p className="input-label">🗓 It starts at</p>
              <input
                type="datetime-local"
                placeholder="Type here"
                {...register("startsAt", { required: true })}
              />
              <p className="input-label">
                🏁 It ends at&nbsp;
                <span class="font-light text-gray-500">(optional)</span>
              </p>
              <input
                type="datetime-local"
                placeholder="Type here"
                {...register("endsAt")}
              />
              <p className="input-label">
                📍 It’s happening at&nbsp;
                <span class="font-light text-gray-500">(optional)</span>
              </p>
              <input
                type="text"
                placeholder="Type here"
                {...register("locaton")}
              />
              <p className="input-label">
                🔗 Add a URL link&nbsp;
                <span class="font-light text-gray-500">(optional)</span>
              </p>
              <input type="link" placeholder="URL" {...register("url")} />
              <p className="input-label">
                ✏️ Description&nbsp;
                <span class="font-light text-gray-500">(optional)</span>
              </p>
              <textarea placeholder="Type here" {...register("description")} />
              <button
                className="py-3 px-6 mb-8 text-base md:text-md lg:text-xl create-event font-semibold text-white"
                type="submit"
              >
                Create event
              </button>
            </div>
            <div className="flex w-full relative md:order-1 h-fit self-center justify-center">
              <div className="relative w-full sm:w-80 md:w-96  lg:w-[30rem] h-96 md:h-96 lg:h-[30rem] rounded-md">
                <WImage
                  src={selectedFile || UploadPhoto}
                  loader={!selectedFile}
                  className={"rounded-md"}
                />
                {selectedFile && (
                  <p
                    className="absolute bottom-0 left-0 text-purple-800 font-bold text-lg p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileRef.current.click();
                    }}
                  >
                    Change photo
                  </p>
                )}
                <div
                  className="center w-full h-fit flex items-center justify-center text-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileRef.current.click();
                  }}
                >
                  {!selectedFile && (
                    <div className="relative h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20">
                      <WImage
                        src={Camera}
                        className={"rounded-md"}
                        width={100}
                        height={100}
                        layout={"responsive"}
                      />
                      <p className="text-white font-bold text-md md:text-lg lg:text-xl">
                        Choose a photo
                      </p>
                    </div>
                  )}
                  <input
                    type={"file"}
                    onChange={(e) => {
                      setSelectedPhoto(e);
                      onPhotoChange(e);
                    }}
                    onBlur={onPhotoBlur}
                    name={photoName}
                    ref={(e) => {
                      fileRef.current = e;
                      photoRef(e);
                    }}
                    className="absolute top-0 left-0 invisible"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
