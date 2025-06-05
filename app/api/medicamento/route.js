import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const medicamentos = await prisma.medicamento.findMany();
  return new Response(JSON.stringify(medicamentos), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request) {
  const data = await request.json();
  const nuevo = await prisma.medicamento.create({ data });
  return new Response(JSON.stringify(nuevo), {
    headers: { 'Content-Type': 'application/json' }
  });
}
