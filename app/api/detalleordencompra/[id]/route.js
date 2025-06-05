import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;
  const item = await prisma.detalleOrdenCompra.findUnique({
    where: { id: parseInt(id) },
    include: { medicamento: true },
  });

  if (!item) return new Response("No encontrado", { status: 404 });

  return new Response(JSON.stringify(item), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  const actualizado = await prisma.detalleOrdenCompra.update({
    where: { id: parseInt(id) },
    data,
  });

  return new Response(JSON.stringify(actualizado), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await prisma.detalleOrdenCompra.delete({
    where: { id: parseInt(id) },
  });

  return new Response("Eliminado correctamente", { status: 200 });
}
