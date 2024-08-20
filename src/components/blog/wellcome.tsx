import Image from 'next/image';

const eventDetails = [
  {
    title: '什麼是FRC？',
    description: `好像很多人對選社很困擾，我來講我的看法好了
小編我是推薦大家可以加入FRC，他是我們學校的機器人校隊。雖說是機器人校隊，但我覺得這裡比較像是一個大家庭，大家都會戶像照顧幫忙，一起靠北那些討人厭的老師。同時能認識很多形形色色的人，「沒有經驗的人」也可以加入，像是美術、公關、偵查老師等都是我們很需要的人才。
最重要的事，因我們是校隊的關係，所以你們還是可以選社團，時間上並不會衝突。在這裡我們可以使用中午、放學後、乃至於直接請公假開溜，而且時間上很自由，像是我們有些隊員一個學期只出現三四次而已。`,
    imageUrl: '/FRC.jpg',
  },
  {
    title: '在這裡可以獲得什麼？',
    description: `時間 : 8/22 16:00~18:00\n
    地點 : 圖書館五樓中間教室\n
    微課程主題：行星齒輪箱馬達組，組裝教學&體驗\n
    尋寶時間\n
    場地巡禮`,
    imageUrl: '/FRC.jpg',
  },
  {
    title: '加入需要做什麼？',
    description: `時間 : 8/22 16:00~18:00\n
    地點 : 圖書館五樓中間教室\n
    微課程主題：行星齒輪箱馬達組，組裝教學&體驗\n
    尋寶時間\n
    場地巡禮`,
    imageUrl: '/FRC.jpg',
  },
];

export default function Wellcome() {
  return (
    <div className="container mx-auto px-4">
      {eventDetails.map((event, index) => (
        <section key={index} className="max-w-4xl mx-auto border-b border-gray-200 py-6">
          <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
          <p className="mt-2 text-gray-700 text-xl whitespace-pre-line">
            {event.description}
          </p>
          <div className="mt-4">
            <Image
              src={event.imageUrl}
              alt={`${event.title} 圖片`}
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </section>
      ))}
    </div>
  );
}
