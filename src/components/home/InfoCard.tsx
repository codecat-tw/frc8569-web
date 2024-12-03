import { Icon } from "@iconify/react";

const items = [
  {
    icon: "ic:round-format-shapes",
    title: "關於 FRC8569",
    description:
      "中和高中 FRC 8569 北極星隊於2020年創立，目前邁入第四年。團隊由中和高中兩位生活科技教師帶領，參加各類機器人競賽，展現 FRC 競賽精神。學生積極參與募款活動，以支持競賽所需的資金，並與當地企業合作，獲得支持。2024年，團隊將前往美國加州參加 FRC 世界區賽，這是中和高中首次出國參賽，師生滿懷信心，期望在賽事中取得佳績。",
    buttonText: "認識我們",
  },
  {
    icon: "ic:round-event",
    title: "各組介紹",
    description:
      "FRC 是一個重視團隊合作的競賽，為了提供學生們發揮專長的機會，我們提供了許多不一樣類型的組別，包含程式組、機構組、配電組、公關組、策略組等等...。你可以依照你的興趣選擇組別，與其他隊員切磋交流一起進步！",
    buttonText: "各組說明",
  },
  {
    icon: "ic:round-group",
    title: "成員介紹",
    description:
      "我們是中和高中的校隊，成立於 2020 年。多年來有許多優秀的人才參與過 FRC 並在大學中取得優異成績，其中更不乏進入科技業乃至於嘗試自行創業的人，同時也是大學入學管道「特殊選才」的重要經歷。你可以查看歷屆名單來更加詳細的了解我們！",
    buttonText: "歷屆成員",
  },
  {
    icon: "ic:round-group",
    title: "管理系統",
    description:
      "這個網站是由團隊程式組從頭建立的，有別於他校需要複雜的手續，我們透過場地管理系統實現數位管理，隊員線上填寫表單後老師能夠及時核准，並在結束時給予評價反饋。",
    buttonText: "瞭解技術",
  },
];

export default function InfoCard() {
  return (
    <div className="container mx-auto flex flex-col px-4 sm:px-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="mb-6 flex flex-col items-center bg-blue-100 p-4 sm:p-8 md:flex-row"
        >
          <div className="flex w-full items-center justify-center p-4 md:w-1/2">
            <Icon icon={item.icon} width="128" height="128" />
          </div>
          <div className="mt-4 w-full md:ml-4 md:mt-0 md:w-1/2">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
              {item.title}
            </h2>
            <p className="mb-4 text-sm text-gray-600 sm:text-base">
              {item.description}
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="rounded bg-blue-500 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-blue-600 sm:px-4 sm:py-2">
                {item.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
