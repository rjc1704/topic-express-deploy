import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const app = express();
const prisma = new PrismaClient();

// AWS S3 설정
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// multer-s3 설정
const upload = multer({
  storage: multerS3({
    s3: s3,
    // bucket을 함수로 변경 - 동적으로 버킷 선택
    bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
    key: (req, file, cb) => {
      // 버킷이 분리되어 있으므로 폴더 구분 불필요
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

app
  .route("/")
  .get(async (req, res) => {
    const diaryEntries = await prisma.diaryEntry.findMany();
    return res.status(200).json(diaryEntries);
  })
  .post(upload.single("photo"), async (req, res) => {
    const { date, content } = req.body;
    const { location, key } = req.file; // S3에 저장된 경로

    // DB 저장
    const diaryEntry = await prisma.diaryEntry.create({
      data: {
        date: new Date(date),
        content,
        photoUrl: location,
      },
    });

    return res.json(diaryEntry);
  });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
