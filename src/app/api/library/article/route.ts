import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const relativePath = searchParams.get('path');

  if (!section || !relativePath) {
    return NextResponse.json({ error: 'Missing section or path' }, { status: 400 });
  }

  // Prevent directory traversal
  const safeSection = section.replace(/[^a-zA-Z0-9_-]/g, '');
  const cleanPath = relativePath.replace(/\.\./g, '').replace(/\.[^/.]+$/, '.md');
  const fullPath = path.resolve(`archive/${safeSection}/${cleanPath}`);

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    return NextResponse.json({ content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
