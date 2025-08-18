import { NextRequest, NextResponse } from 'next/server';
import { fetchPlanetById } from '../../../lib/planetsApi';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid planet ID' }, { status: 400 });
    }

    const planet = await fetchPlanetById(Number(id));

    if (!planet) {
      return NextResponse.json({ error: 'Planet not found' }, { status: 404 });
    }

    return NextResponse.json(planet);
  } catch (error) {
    console.error('Error in planets API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
