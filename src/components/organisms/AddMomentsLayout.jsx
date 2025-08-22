import React from "react";
import PhotosIcon from "../../assets/image-photography-icon 2.png";
import VideoIcon from "../../assets/video-icon 2.png";
import MicIcon from "../../assets/mic.png";
import NotesIcon from "../../assets/notes.png";
import CatalogueIcon from "../../assets/catalogue.png";

function AddMomentsLayout() {
  const CatalogueFeatures = [
    { icon: PhotosIcon, label: "Photos", text: "Photos" },
    { icon: VideoIcon, label: "Videos", text: "Videos" },
    { icon: MicIcon, label: "Microphone", text: "Memo" },
    { icon: NotesIcon, label: "Notes", text: "Notes" },
    { icon: CatalogueIcon, label: "Catalogue", text: "Generate Travelogue" },
  ];

  return (
    <div className="font-['Sora'] px-4">
      <div
        className="w-full px-12 my-12 flex flex-col gap-2  border-b-2
       border-t-2 border-[#D4D1D1] pt-5"
      >
        <p className="text-[32px] text-[#5B5757] pb-4">
          Add moments from your trips
        </p>
        <div className="flex gap-2 pb-8">
          {CatalogueFeatures.map((item, index) => (
            <div key={item.label} className="flex flex-col items-center">
              <div
                className={`flex w-[114px] ${
                  index === CatalogueFeatures.length - 1
                    ? "h-[202px] w-[173px] "
                    : "h-[114px]"
                } rounded-2xl border-2 border-[#D4D1D1] justify-center items-center`}
              >
                <img src={item.icon} alt={item.label} />
              </div>
              <p className="mt-2 text-center text-[#4A4545] font-regular text-xl">
                {item.text}
              </p>
            </div>
          ))}
          <div>
            <p className="text-2xl text-[#5B5757] font-semibold mb-6">
              Time Capsules
            </p>
            <div className="w-[347px] h-[118px] rounded-2xl bg-[#e4dcc6] flex justify-center items-center text-xl text-center">
              You haven't created any time capsules yet
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[50px] flex justify-center items-center">
        <p>No active trips to show</p>
      </div>
    </div>
  );
}

export default AddMomentsLayout;
