import initSqlJs from 'sql.js';

let SQL: any;
let db: any;

export async function initDatabase() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: (file: string) => `/sql.js/${file}`
    });
  }

  if (!db) {
    db = new SQL.Database();
    
    // Create sample tables and insert data
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY,
        product_name TEXT,
        category TEXT,
        price DECIMAL(10,2),
        release_date DATE
      );

      CREATE TABLE IF NOT EXISTS sales (
        sale_id INTEGER PRIMARY KEY,
        product_id INTEGER,
        quantity INTEGER,
        sale_date DATE,
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      );

      -- Insert sample product data
      INSERT OR IGNORE INTO products VALUES
        (1, 'Smartphone X', 'Electronics', 999.99, '2024-01-15'),
        (2, 'Laptop Pro', 'Electronics', 1499.99, '2024-02-01'),
        (3, 'Wireless Earbuds', 'Electronics', 199.99, '2024-03-10'),
        (4, 'Smart Watch', 'Electronics', 299.99, '2024-03-15'),
        (5, 'Tablet Ultra', 'Electronics', 799.99, '2024-02-20');

      -- Insert sample sales data
      INSERT OR IGNORE INTO sales VALUES
        (1, 1, 10, '2024-03-01'),
        (2, 2, 5, '2024-03-05'),
        (3, 3, 15, '2024-03-10'),
        (4, 4, 8, '2024-03-15'),
        (5, 5, 12, '2024-03-20');
    `);
  }

  return db;
}

export async function executeQuery(query: string): Promise<QueryResult[]> {
  const db = await initDatabase();
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