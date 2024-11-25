import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'matches.csv');
    const csvData = fs.readFileSync(filePath, 'utf-8');
    
    return NextResponse.json({ 
      data: csvData,
      fileName: path.basename(filePath)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read CSV file' },
      { status: 500 }
    );
  }
} 