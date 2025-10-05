// src/app/api/leaderboard/route.js
import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { promises as fs } from 'fs';
import path from 'path';

// Auto-detect numeric fields
const isNumericField = (fieldName) => {
  const numericPatterns = [
    /^#/,            // Starts with #
    /^total/i,       // Starts with "total"
    /count$/i,       // Ends with "count"
    /^number/i,      // Starts with "number"
  ];
  
  const excludePatterns = [
    /names of/i,     // "Names of Completed..."
    /url/i,          // URLs
    /email/i,        // Emails
    /status/i,       // Status fields
  ];
  
  if (excludePatterns.some(p => p.test(fieldName))) return false;
  return numericPatterns.some(p => p.test(fieldName));
};

// ✅ Always read CSV from local file (Netlify friendly)
const readLocalCSV = async () => {
  const CSV_FILE_PATH = path.join(process.cwd(), 'public', 'data.csv');
  return await fs.readFile(CSV_FILE_PATH, 'utf-8');
};

export async function GET() {
  try {
    // Always use local CSV on Netlify
    const csvString = await readLocalCSV();
    const result = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });
    
    const headers = result.meta.fields || [];
    
    const transformedData = result.data.map(row => {
      const transformedRow = {};
      Object.keys(row).forEach(key => {
        transformedRow[key] = isNumericField(key)
          ? parseInt(row[key]) || 0
          : row[key];
      });
      return transformedRow;
    });
    
    return NextResponse.json({
      data: transformedData,
      headers: headers,
      totalRecords: transformedData.length,
      lastUpdated: new Date().toISOString(),
      source: 'local-csv'
    });
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch data',
      message: error.message,
      details: error.stack
    }, { status: 500 });
  }
}
