const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // CORS 패키지

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173' // 특정 도메인만 허용하는 설정
}));
app.use(express.json());  

// PostgreSQL DB Connection Pool
const pool = new Pool({
    user: 'DB User',          
    host: 'DB Host',
    database: 'DB Name', 
    password: 'DB Password', 
    port: 5432,               
});

// PostgreSQL DB 연결 테스트
pool.connect((err, client, release) => {
  if (err) {
    return console.error('PostgreSQL DB 연결 실패:', err.stack);
  }
  console.log('PostgreSQL DB 연결 성공');
  release();
});

// [CREATE] - (POST /api/dept) - 부서 등록
app.post('/api/dept', async (req, res) => {
  const { deptno, dname, loc } = req.body;
  const query = 'INSERT INTO dept (deptno, dname, loc) VALUES ($1, $2, $3) RETURNING *';
  
  try {
    const result = await pool.query(query, [deptno, dname, loc]);
    res.status(201).json(result.rows[0]); // data 반환
    //console.log()
  } catch (err) {
    console.error('Create Error:', err.message);
    res.status(500).json({ error: '부서 등록 중 오류 발생' });
  }
});

// [READ - ALL] - (GET /api/dept) - 전체 부서 목록 조회 
app.get('/api/dept', async (req, res) => {
  const query = 'SELECT * FROM dept ORDER BY deptno ASC';
  
  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows); 
  } catch (err) {
    console.error('Read All Error:', err.message);
    res.status(500).json({ error: '부서 목록 가져오기 중 오류 발생' });
  }
});

// [READ - DETAIL] - (GET /api/dept/:deptno) - 특정 부서 조회 
app.get('/api/dept/:deptno', async (req, res) => {
  const { deptno } = req.params;
  const query = 'SELECT * FROM dept WHERE deptno = $1';
  
  try {
    const result = await pool.query(query, [deptno]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '해당 부서 없음' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Read Detail Error:', err.message);
    res.status(500).json({ error: '부서 조회 중 오류 발생' });
  }
});

// [UPDATE] - (PUT /api/dept/:deptno) - 부서 정보 수정
app.put('/api/dept/:deptno', async (req, res) => {
  const { deptno } = req.params;
  const { dname, loc } = req.body;
  const query = 'UPDATE dept SET dname = $1, loc = $2 WHERE deptno = $3 RETURNING *';
  
  try {
    const result = await pool.query(query, [dname, loc, deptno]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '수정할 부서 없음' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update Error:', err.message);
    res.status(500).json({ error: '부서 정보 수정 중 오류 발생' });
  }
});

// [DELETE] - (DELETE /api/dept/:deptno) - 부서 삭제 
app.delete('/api/dept/:deptno', async (req, res) => {
  const { deptno } = req.params;
  const query = 'DELETE FROM dept WHERE deptno = $1 RETURNING *';
  
  try {
    const result = await pool.query(query, [deptno]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '삭제할 부서 없음' });
    }
    res.status(200).json({ message: '삭제 성공' });
  } catch (err) {
    console.error('Delete Error:', err.message);
    res.status(500).json({ error: '부서 삭제 중 오류 발생' });
  }
});

// BE 시작
app.listen(PORT, () => {
  console.log(`BE 실행 중 - http://localhost:${PORT} `);
});
