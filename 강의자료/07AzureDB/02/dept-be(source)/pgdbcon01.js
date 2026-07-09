// pgdbconn01.js
const { Client } = require('pg');

// PostgreSQL 연결 정보 설정
const client = new Client({
  user: 'pgadmin00',         // DB User
  host: 'pgsql25<이니셜>.postgres.database.azure.com',        // DB Host
  database: 'scottdb', // DB Name
  password: 'Pa55w.rdazSW',// DB Password
  port: 5432,               // PostgreSQL Port
  ssl: {
    rejectUnauthorized: false // SSL 구성
  }
});

// 데이터베이스 연결 및 확인
async function testConnection() {
  try {
    await client.connect();
    console.log('PostgreSQL 연결 성공!');

    // 데이터베이스 시간 확인
    const res = await client.query('SELECT NOW()');
    console.log('현재 DB 시간:', res.rows[0].now);

  } catch (err) {
    console.error('연결 실패:', err.message);
  } finally {
    await client.end(); // 연결 종료
    console.log('연결 종료');
  }
}

testConnection();
