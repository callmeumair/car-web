import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      carId,
      userId,
      startDate,
      endDate,
      pickupLocation,
      paymentMethodId,
      depositAmount,
    } = body;

    // Validate required fields
    if (!carId || !userId || !startDate || !endDate || !pickupLocation || !paymentMethodId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check car availability
    const car = await prisma.car.findUnique({
      where: { id: carId },
      include: { bookings: true },
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        carId,
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) },
          },
        ],
      },
    });

    if (overlappingBooking) {
      return NextResponse.json(
        { error: 'Car is not available for the selected dates' },
        { status: 400 }
      );
    }

    // Calculate total amount
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalAmount = car.price * days;

    // Process payment with Stripe
    try {
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, // Convert to cents
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`,
      });

      // Create booking record
      const booking = await prisma.booking.create({
        data: {
          carId,
          userId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          pickupLocation,
          totalAmount,
          depositAmount,
          paymentIntentId: paymentIntent.id,
          status: 'CONFIRMED',
        },
      });

      // Update car availability
      await prisma.car.update({
        where: { id: carId },
        data: { isAvailable: false },
      });

      return NextResponse.json({
        success: true,
        booking,
        paymentIntent,
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      return NextResponse.json(
        { error: 'Payment processing failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const carId = searchParams.get('carId');

    const where = {
      ...(userId && { userId }),
      ...(carId && { carId }),
    };

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        car: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 