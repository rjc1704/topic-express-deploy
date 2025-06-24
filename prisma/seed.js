import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const diaryEntries = [
  {
    content:
      "오늘은 정말 좋은 날씨였다. 공원에서 산책을 하면서 새싹들이 돋아나는 것을 보았다. 봄이 왔다는 것이 실감된다.",
    photoUrl: "photos/1.jpg",
  },
  {
    content:
      "친구들과 함께 맛있는 피자를 먹었다. 오랜만에 만나서 정말 즐거웠다. 다음에 또 만나기로 했다.",
    photoUrl: "photos/2.jpg",
  },
  {
    content:
      "새로운 책을 읽기 시작했다. 이번 주말에는 이 책을 끝까지 읽어보려고 한다. 정말 흥미진진하다.",
    photoUrl: null,
  },
  {
    content:
      "오늘은 집에서 요리를 해봤다. 처음 시도한 레시피였는데 생각보다 잘 나왔다. 다음에는 더 도전적인 요리에 도전해보고 싶다.",
    photoUrl: null,
  },
  {
    content:
      "비가 오는 날씨였다. 창가에 앉아서 커피를 마시며 비 소리를 들었다. 이런 날씨도 나름의 매력이 있다.",
    photoUrl: "photos/1.jpg",
  },
  {
    content:
      "운동을 시작했다. 처음에는 힘들었지만 점점 익숙해지고 있다. 건강한 몸을 위해 꾸준히 해야겠다.",
    photoUrl: null,
  },
  {
    content:
      "새로운 영화를 봤다. 예상보다 훨씬 재미있었다. 주말에 친구들에게 추천해주고 싶다.",
    photoUrl: "photos/2.jpg",
  },
  {
    content:
      "오늘은 정말 바쁜 하루였다. 하지만 할 일을 모두 마쳤을 때의 성취감이 정말 좋았다.",
    photoUrl: null,
  },
  {
    content:
      "가족들과 함께 저녁을 먹었다. 평소보다 더 맛있게 느껴졌다. 가족의 소중함을 다시 한번 깨달았다.",
    photoUrl: null,
  },
  {
    content:
      "새로운 취미를 시작했다. 처음에는 어려웠지만 점점 재미를 느끼고 있다. 새로운 도전은 항상 설레게 한다.",
    photoUrl: "photos/1.jpg",
  },
];

async function main() {
  console.log("시드 데이터 생성을 시작합니다...");

  // 기존 데이터 삭제 (선택사항)
  await prisma.diaryEntry.deleteMany({});

  // 새로운 시드 데이터 생성
  for (const entry of diaryEntries) {
    await prisma.diaryEntry.create({
      data: entry,
    });
  }

  console.log("시드 데이터 생성이 완료되었습니다!");
  console.log(`${diaryEntries.length}개의 일기 항목이 생성되었습니다.`);
}

main()
  .catch((e) => {
    console.error("시드 데이터 생성 중 오류가 발생했습니다:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
