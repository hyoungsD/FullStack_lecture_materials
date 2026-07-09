import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3000/api/dept';

function App() {
  // 상태 관리 (부서 목록, 입력 폼, 수정 모드)
  const [depts, setDepts] = useState([]);
  const [form, setForm] = useState({ deptno: '', dname: '', loc: '' });
  const [isEditing, setIsEditing] = useState(false);

  // 1. [READ] 부서 목록 불러오기
  const fetchDepts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('데이터 로드 실패');
      const data = await response.json();
      setDepts(data);
    } catch (err) {
      console.error(err);
      alert('부서 목록을 가져오지 못했습니다.');
    }
  };

  useEffect(() => {
    fetchDepts();
  }, []);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 2. [CREATE & UPDATE] 등록 및 수정 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${form.deptno}` : API_URL;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert(isEditing ? '부서가 수정되었습니다.' : '부서가 등록되었습니다.');
        setForm({ deptno: '', dname: '', loc: '' });
        setIsEditing(false);
        fetchDepts(); // 목록 갱신
      } else {
        const errData = await response.json();
        alert(`요청 실패: ${errData.error || '오류 발생'}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. [UPDATE MODE] 수정 버튼 클릭 시 폼에 데이터 세팅
  const handleEditClick = (dept) => {
    setIsEditing(true);
    setForm({ deptno: dept.deptno, dname: dept.dname, loc: dept.loc });
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setForm({ deptno: '', dname: '', loc: '' });
  };

  // 4. [DELETE] 부서 삭제 핸들러
  const handleDelete = async (deptno) => {
    if (!window.confirm(`${deptno}번 부서를 삭제하시겠습니까?`)) return;

    try {
      const response = await fetch(`${API_URL}/${deptno}`, { method: 'DELETE' });
      if (response.ok) {
        alert('삭제되었습니다.');
        fetchDepts(); // 목록 갱신
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>부서 관리 시스템 (React)</h1>

      {/* 입력 / 수정 폼 */}
      <form onSubmit={handleSubmit} className="dept-form">
        <h2>{isEditing ? '부서 정보 수정' : '새 부서 등록'}</h2>
        <div className="form-group">
          <input
            type="number"
            name="deptno"
            placeholder="부서번호"
            value={form.deptno}
            onChange={handleInputChange}
            disabled={isEditing} // 수정 모드일 때는 PK인 부서번호 변경 불가
            required
          />
          <input
            type="text"
            name="dname"
            placeholder="부서명"
            value={form.dname}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="loc"
            placeholder="지역"
            value={form.loc}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {isEditing ? '수정 완료' : '등록'}
          </button>
          {isEditing && (
            <button type="button" onClick={handleCancelEdit} className="btn-secondary">
              취소
            </button>
          )}
        </div>
      </form>

      {/* 부서 목록 테이블 */}
      <div className="table-container">
        <h2>부서 목록 ({depts.length}개)</h2>
        <table>
          <thead>
            <tr>
              <th>부서번호</th>
              <th>부서명</th>
              <th>지역</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {depts.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>등록된 부서가 없습니다.</td>
              </tr>
            ) : (
              depts.map((dept) => (
                <tr key={dept.deptno}>
                  <td>{dept.deptno}</td>
                  <td>{dept.dname}</td>
                  <td>{dept.loc}</td>
                  <td>
                    <button onClick={() => handleEditClick(dept)} className="btn-edit">
                      수정
                    </button>
                    <button onClick={() => handleDelete(dept.deptno)} className="btn-delete">
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
