-- CreateTable
CREATE TABLE "Tech" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "invertInDarkMode" BOOLEAN NOT NULL,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);
