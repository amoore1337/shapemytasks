-- CreateTable
CREATE TABLE "Flags" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(255),
    "createdById" INTEGER NOT NULL,
    "scopeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "createdById" INTEGER,
    "visibility" VARCHAR(255) NOT NULL DEFAULT 'visible',
    "teamId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scopes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "createdById" INTEGER,
    "projectId" INTEGER,
    "color" VARCHAR(255) NOT NULL DEFAULT '#0277bd',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "position" VARCHAR(255),
    "closedAt" TIMESTAMPTZ(6),
    "niceToHave" BOOLEAN,

    CONSTRAINT "Scopes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "createdById" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "joinCode" VARCHAR(255),
    "restrictEmailDomain" VARCHAR(255),

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "avatarUrl" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "teamId" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Flags" ADD CONSTRAINT "Flags_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Flags" ADD CONSTRAINT "Flags_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "Scopes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Scopes" ADD CONSTRAINT "Scopes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Scopes" ADD CONSTRAINT "Scopes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

