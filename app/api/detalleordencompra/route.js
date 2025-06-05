import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const detalles = await prisma.detalleOrdenCompra.findMany({
    include: { medicamento: true }
  });
  return new Response(JSON.stringify(detalles), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request) {
  const data = await request.json();
  const nuevo = await prisma.detalleOrdenCompra.create({ data });
  return new Response(JSON.stringify(nuevo), {
    headers: { 'Content-Type': 'application/json' }
  });
}
