-- CreateTable
CREATE TABLE "Usuarios" (
    "usuarioId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "clave" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "Ventas" (
    "ventaId" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "usuarioId_FK" INTEGER NOT NULL,

    CONSTRAINT "Ventas_pkey" PRIMARY KEY ("ventaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_usuarioId_FK_fkey" FOREIGN KEY ("usuarioId_FK") REFERENCES "Usuarios"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;
