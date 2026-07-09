# Azure PostgreSQL

## PostgreSQL

- 오픈소스 객체-관계형 데이터베이스 관리 시스템(ORDBMS). 
- 대규모 엔터프라이즈 환경에 적합한 강력한 안정성과 데이터 무결성을 제공하며, 복잡한 데이터 분석 및 웹 애플리케이션에 널리 사용됨.

### Azure Database for PostgreSQL Flexible Server
- 일반적인 단일 서버용 PostgreSQL 데이터베이스 서비스.

### Azure Cosmos DB for PostgreSQL
- 수평 확장(샤딩)이 가능한 분산형 PostgreSQL 데이터베이스.

### Azure HorizonDB
- 대규모 엔터프라이즈(기업용) 및 AI 워크로드를 위해 새롭게 설계된 클라우드 네이티브 PostgreSQL 서비스.

### 비교

| 서비스 | 아키텍처 (확장 방식) | 강점 및 핵심 기능 | 권장 용도 |
| --- | --- | --- | --- |
| Azure Database for PostgreSQL Flexible Server| 싱글 노드 | 비용 효율적, 세부적인 DB 파라미터 제어 가능 | 일반적인 웹/앱 백엔드 |
| Azure Cosmos DB for PostgreSQL | 멀티 노드 (수평 확장) | 데이터 및 트랜잭션 분산 처리(Sharding) |초대용량 데이터, 글로벌 IoT 처리 |
| Azure HorizonDB | 컴퓨트/스토리지 | 분리초고속 장애 조치, 대규모 읽기 확장, AI/벡터 검색 내장 | 미션 크리티컬 엔터프라이즈 시스템 및 AI 앱 | 

