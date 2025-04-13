import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/inventory
export async function GET() {
  try {
    const inventory = await prisma.car.findMany({
      include: {
        category: true,
        bookings: true,
      },
    });
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

// POST /api/inventory
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const car = await prisma.car.create({
      data: {
        name: data.name,
        type: data.type,
        price: data.price,
        image: data.image,
        features: data.features,
        categoryId: data.categoryId,
        status: 'AVAILABLE',
      },
    });
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
  }
}

// PUT /api/inventory/:id
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Car ID is required' }, { status: 400 });
    }

    const car = await prisma.car.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        type: data.type,
        price: data.price,
        image: data.image,
        features: data.features,
        categoryId: data.categoryId,
        status: data.status,
      },
    });
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 });
  }
}

// DELETE /api/inventory/:id
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Car ID is required' }, { status: 400 });
    }

    await prisma.car.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Car deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
  }
} 