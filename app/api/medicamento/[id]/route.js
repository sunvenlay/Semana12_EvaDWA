import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;
  const item = await prisma.medicamento.findUnique({
    where: { CodMedicamento: parseInt(id) },
  });

  if (!item) return new Response("No encontrado", { status: 404 });

  return new Response(JSON.stringify(item), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  const actualizado = await prisma.medicamento.update({
    where: { CodMedicamento: parseInt(id) },
    data,
  });

  return new Response(JSON.stringify(actualizado), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await prisma.medicamento.delete({
    where: { CodMedicamento: parseInt(id) },
  });

  return new Response("Eliminado correctamente", { status: 200 });
}
