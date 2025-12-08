const { Client } = require('pg');

const client = new Client({
  user: 'postgres.siqjbyunmhiedbhbjwvf',
  password: '8YLJyE3wddBomH1k',
  host: 'aws-0-us-west-2.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  ssl: false
});

client.connect((err) => {
  if (err) {
    process.exit(1);
  }
  client.end();
});
