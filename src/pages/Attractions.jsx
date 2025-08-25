
import MainLayout from "../components/organisms/MainLayout";
import { Dropdown } from "flowbite-react";


import BasilicaImg from "../assets/Basilica.png.png";
import ColosseumImg from "../assets/Colesseum.png.png";
import PantheonImg from "../assets/Pantheon.png.png";
import TreviImg from "../assets/Trevi-Fountain.png.png";

function Attractions() {
  return (
    <MainLayout>
      <div className="px-8 pt-8">
       
        <div className="flex items-start ">
         
          <div>
            <div className="flex flex-col justify-center w-[314px] h-[98px] shrink-0">
              <h1 className="text-[40px] font-bold text-[#2A3A33] leading-none">
                Attractions
              </h1>
            </div>

            {/* Rome + Filter by popularity */}
            <div className="flex items-center gap-6 mt-2">
              <h2 className="text-[32px] font-medium text-[#2B473F] leading-[24px]">
                Rome
              </h2>

              <div className="flex flex-col gap-1 ml-auto">
                <span
                  className="text-[#747373] text-[16px] font-medium leading-6"
                  style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                >
                  Filter by popularity:
                </span>

                <div className="relative w-[163px] h-[12px] rounded-[16px] bg-[#D3D3D3] flex items-center justify-between px-2">
                  <span className="w-3 h-3 rounded-full bg-[#5E7C73]" />
                  <span className="w-3 h-3 rounded-full bg-[#E0E0D7]" />
                  <span className="w-3 h-3 rounded-full bg-[#E0E0D7]" />
                  <span className="w-3 h-3 rounded-full bg-[#E0E0D7]" />
                </div>
              </div>
            </div>
          </div>

          {/* Djathtas: dropdownat */}
          <div className="flex items-center gap-3 pt-6 ml-[400px]">
            <Dropdown
              label="All categories"
              size="lg"
              className="w-[241px] h-[50px] rounded-lg border border-[#C3C3C3] bg-[#F4F1E9] text-[#2A3A33] font-medium"
            >
              <Dropdown.Item>All categories</Dropdown.Item>
            </Dropdown>

            <div className="relative">
              {/* Ikona e lupës majtas */}
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#2A3A33" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="#2A3A33" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search places"
                className="w-[241px] h-[50px] pl-10 pr-3 rounded-lg border border-[#C3C3C3] bg-[#F4F1E9] text-[#2A3A33] text-[16px] font-medium placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#C3C3C3]/60"
              />
            </div>
          </div>
        </div>

        {/* LISTA E KARTAVE */}
        <div className="mt-6 flex flex-col gap-4">
          {/* CARD 1: St. Peter's Basilica */}
          <div className="relative z-10 flex items-center w-[389px] h-[131px] rounded-[16px] bg-[#F4F1E9] overflow-hidden shadow-sm border border-[#E6E1D6]">
            {/* Foto (136x131, radius 8) */}
            <img
              src={BasilicaImg}
              alt="St. Peter's Basilica"
              className="w-[136px] h-[131px] object-cover rounded-l-[8px]"
            />

            {/* Teksti */}
            <div className="flex flex-col justify-between px-3 py-2 flex-1">
              <h3 className="text-[18px] font-semibold text-[#2A3A33]">
                St. Peter's Basilica
              </h3>
              <p className="text-[14px] text-[#747373]">#historic #architecture</p>

              {/* Butoni Add to Trip (klikues) */}
              <button
                type="button"
                onClick={() => console.log("Add to Trip: St. Peter's Basilica")}
                className="flex items-center gap-2 mt-2 text-[14px] text-[#2B473F] font-medium cursor-pointer select-none hover:opacity-90 active:scale-[0.98] transition"
                aria-label="Add St. Peter's Basilica to trip"
              >
                <span className="w-[15px] h-[15px] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.8034 2.19689C15.7323 5.12587 15.7323 9.87468 12.8034 12.8037C9.87444 15.7325 5.12562 15.7325 2.19664 12.8037C-0.732214 9.87468 -0.732214 5.12587 2.19664 2.19689C5.12562 -0.73197 9.87444 -0.73197 12.8034 2.19689ZM11.4267 7.07412C11.6621 7.07412 11.8527 7.26492 11.8527 7.50015C11.8527 7.73551 11.6619 7.92618 11.4267 7.92618H7.92606V11.4269C7.92606 11.6623 7.73526 11.853 7.50003 11.853C7.2648 11.853 7.07412 11.6622 7.07412 11.4269V7.9263H3.57324C3.33789 7.9263 3.14709 7.73551 3.14709 7.50027C3.14709 7.26504 3.33789 7.07425 3.57324 7.07425H7.074V3.57336C7.074 3.33813 7.2648 3.14733 7.49991 3.14733C7.73526 3.14733 7.92594 3.33813 7.92594 3.57336V7.07412H11.4267Z"
                      fill="#44695E"
                    />
                  </svg>
                </span>
                Add to Trip
              </button>
            </div>
          </div>

          {/* CARD 2: Colosseum */}
          <div className="relative z-10 flex items-center w-[389px] h-[131px] rounded-[16px] bg-[#F4F1E9] overflow-hidden shadow-sm border border-[#E6E1D6]">
            <img
               src={ColosseumImg}            
              alt="Colosseum"
              className="w-[136px] h-[131px] object-cover rounded-l-[8px]"
            />
            <div className="flex flex-col justify-between px-3 py-2 flex-1">
              <h3 className="text-[18px] font-semibold text-[#2A3A33]">Colosseum</h3>
              <p className="text-[14px] text-[#747373]">#historic #architecture</p>
              <button
                type="button"
                onClick={() => console.log("Add to Trip: Colosseum")}
                className="flex items-center gap-2 mt-2 text-[14px] text-[#2B473F] font-medium cursor-pointer select-none hover:opacity-90 active:scale-[0.98] transition"
                aria-label="Add Colosseum to trip"
              >
                <span className="w-[15px] h-[15px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.8034 2.19689C15.7323 5.12587 15.7323 9.87468 12.8034 12.8037C9.87444 15.7325 5.12562 15.7325 2.19664 12.8037C-0.732214 9.87468 -0.732214 5.12587 2.19664 2.19689C5.12562 -0.73197 9.87444 -0.73197 12.8034 2.19689ZM11.4267 7.07412C11.6621 7.07412 11.8527 7.26492 11.8527 7.50015C11.8527 7.73551 11.6619 7.92618 11.4267 7.92618H7.92606V11.4269C7.92606 11.6623 7.73526 11.853 7.50003 11.853C7.2648 11.853 7.07412 11.6622 7.07412 11.4269V7.9263H3.57324C3.33789 7.9263 3.14709 7.73551 3.14709 7.50027C3.14709 7.26504 3.33789 7.07425 3.57324 7.07425H7.074V3.57336C7.074 3.33813 7.2648 3.14733 7.49991 3.14733C7.73526 3.14733 7.92594 3.33813 7.92594 3.57336V7.07412H11.4267Z" fill="#44695E"/>
                  </svg>
                </span>
                Add to Trip
              </button>
            </div>
          </div>

          {/* CARD 3: Pantheon */}
          <div className="relative z-10 flex items-center w-[389px] h-[131px] rounded-[16px] bg-[#F4F1E9] overflow-hidden shadow-sm border border-[#E6E1D6]">
            <img
               src={PantheonImg}
              alt="Pantheon"
              className="w-[136px] h-[131px] object-cover rounded-l-[8px]"
            />
            <div className="flex flex-col justify-between px-3 py-2 flex-1">
              <h3 className="text-[18px] font-semibold text-[#2A3A33]">Pantheon</h3>
              <p className="text-[14px] text-[#747373]">#historic #architecture</p>
              <button
                type="button"
                onClick={() => console.log("Add to Trip: Pantheon")}
                className="flex items-center gap-2 mt-2 text-[14px] text-[#2B473F] font-medium cursor-pointer select-none hover:opacity-90 active:scale-[0.98] transition"
                aria-label="Add Pantheon to trip"
              >
                <span className="w-[15px] h-[15px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.8034 2.19689C15.7323 5.12587 15.7323 9.87468 12.8034 12.8037C9.87444 15.7325 5.12562 15.7325 2.19664 12.8037C-0.732214 9.87468 -0.732214 5.12587 2.19664 2.19689C5.12562 -0.73197 9.87444 -0.73197 12.8034 2.19689ZM11.4267 7.07412C11.6621 7.07412 11.8527 7.26492 11.8527 7.50015C11.8527 7.73551 11.6619 7.92618 11.4267 7.92618H7.92606V11.4269C7.92606 11.6623 7.73526 11.853 7.50003 11.853C7.2648 11.853 7.07412 11.6622 7.07412 11.4269V7.9263H3.57324C3.33789 7.9263 3.14709 7.73551 3.14709 7.50027C3.14709 7.26504 3.33789 7.07425 3.57324 7.07425H7.074V3.57336C7.074 3.33813 7.2648 3.14733 7.49991 3.14733C7.73526 3.14733 7.92594 3.33813 7.92594 3.57336V7.07412H11.4267Z" fill="#44695E"/>
                  </svg>
                </span>
                Add to Trip
              </button>
            </div>
          </div>

          {/* CARD 4: Trevi Fountain */}
          <div className="relative z-10 flex items-center w-[389px] h-[131px] rounded-[16px] bg-[#F4F1E9] overflow-hidden shadow-sm border border-[#E6E1D6]">
            <img
               src={TreviImg}
              alt="Trevi Fountain"
              className="w-[136px] h-[131px] object-cover rounded-l-[8px]"
            />
            <div className="flex flex-col justify-between px-3 py-2 flex-1">
              <h3 className="text-[18px] font-semibold text-[#2A3A33]">Trevi Fountain</h3>
              <p className="text-[14px] text-[#747373]">#historic #architecture</p>
              <button
                type="button"
                onClick={() => console.log("Add to Trip: Trevi Fountain")}
                className="flex items-center gap-2 mt-2 text-[14px] text-[#2B473F] font-medium cursor-pointer select-none hover:opacity-90 active:scale-[0.98] transition"
                aria-label="Add Trevi Fountain to trip"
              >
                <span className="w-[15px] h-[15px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.8034 2.19689C15.7323 5.12587 15.7323 9.87468 12.8034 12.8037C9.87444 15.7325 5.12562 15.7325 2.19664 12.8037C-0.732214 9.87468 -0.732214 5.12587 2.19664 2.19689C5.12562 -0.73197 9.87444 -0.73197 12.8034 2.19689ZM11.4267 7.07412C11.6621 7.07412 11.8527 7.26492 11.8527 7.50015C11.8527 7.73551 11.6619 7.92618 11.4267 7.92618H7.92606V11.4269C7.92606 11.6623 7.73526 11.853 7.50003 11.853C7.2648 11.853 7.07412 11.6622 7.07412 11.4269V7.9263H3.57324C3.33789 7.9263 3.14709 7.73551 3.14709 7.50027C3.14709 7.26504 3.33789 7.07425 3.57324 7.07425H7.074V3.57336C7.074 3.33813 7.2648 3.14733 7.49991 3.14733C7.73526 3.14733 7.92594 3.33813 7.92594 3.57336V7.07412H11.4267Z" fill="#44695E"/>
                  </svg>
                </span>
                Add to Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Attractions;
