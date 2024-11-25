import initSqlJs from 'sql.js';
import Papa from 'papaparse';

let SQL: any;
let db: any;

export async function initDatabaseFromCSV() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: (file: string) => `/sql.js/${file}`
    });
  }

  if (!db) {
    try {
      db = new SQL.Database();
      
      const response = await fetch(`${window.location.origin}/api/matches`);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV data: ${response.statusText}`);
      }
      
      const { data: csvData, fileName } = await response.json();
      
      // Remove table name extraction from filename and use 'testing' instead
      const tableName = 'testing';
      
      // Parse CSV data
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
      });

      if (parsedData.data.length === 0) {
        throw new Error('No data found in CSV');
      }

      // Generate CREATE TABLE statement from CSV headers
      const headers = Object.keys(parsedData.data[0]);
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          ${headers.map(header => `${header} TEXT`).join(',\n          ')}
        );
      `;

      // Create table
      db.run(createTableSQL);

      // Generate and execute INSERT statements
      const values = parsedData.data.map(row => 
        `(${headers.map(header => `'${(row[header] || '').replace(/'/g, "''")}'`).join(', ')})`
      ).join(',\n          ');

      const insertSQL = `
        INSERT INTO ${tableName} (${headers.join(', ')})
        VALUES
          ${values};
      `;

      db.run(insertSQL);
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  return db;
}

export async function executeQuery(query: string): Promise<QueryResult[]> {
  const db = await initDatabaseFromCSV();
  try {
    const results = db.exec(query);
    return results.map(result => ({
      columns: result.columns,
      values: result.values
    }));
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  }
}

export interface QueryResult {
  columns: string[];
  values: any[][];
} 