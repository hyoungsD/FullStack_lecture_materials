const dayjs = require("dayjs")
require("dayjs/locale/ko");
const utc = require("dayjs/plugin/utc")
const relativeTimePlugin = require("dayjs/plugin/relativeTime")

dayjs.extend(utc)
dayjs.extend(relativeTimePlugin)
dayjs.locale("ko")

const nowDayjs = dayjs();
console.log(nowDayjs.format("YYYY-MM-DD HH:mm:ss"))
console.log(nowDayjs.format("YYYY년 MM월 DD일"))
// 문제 3:  2026년 5월 6일 14시 40분 55초 
console.log(nowDayjs.format("YYYY년 MM월 DD일 HH시 mm분 ss초"))

const dateDayjs = dayjs("2026-08-07")
// YYYY-MM-DD HH:mm:ss
console.log(dateDayjs.format("YYYY-MM-DD HH:mm:ss"))

// 시간 더하기 빼기  day
const nextWeekDayjs1 = dayjs().add(7, "day") // week month 
console.log(nextWeekDayjs1.format("YYYY년 MM월 DD일 HH시 mm분 ss초"))

// 시간 더하기 빼기 week
const nextWeekDayjs2 = dayjs().add(7, "week") // week month 
console.log(nextWeekDayjs2.format("YYYY년 MM월 DD일 HH시 mm분 ss초"))

// 시간 더하기 빼기 month 
const nextWeekDayjs3 = dayjs().add(7, "month") // week month 
console.log(nextWeekDayjs3.format("YYYY년 MM월 DD일 HH시 mm분 ss초"))

// 특정 날짜까지 남은 일수 계산 
const startDt = dayjs("2026-04-01")
const endDt = dayjs("2026-10-23")
const diffDt = endDt.diff(startDt, "month"); // week, month 
console.log(`날짜 차이 ${startDt.format("YYYY년 MM월 DD일 ")} 에서 
    ${endDt.format("YYYY년 MM월 DD일 ")} 는 ${diffDt} 월 이다 `)

// 요일확인
console.log(`오늘은 ${dayjs().format("d")} 요일입니다.`)  ;  
console.log(`오늘은 ${dayjs().format("dd")} 요일입니다.`)  ; 
console.log(`오늘은 ${dayjs().format("ddd")} 요일입니다.`)  ;
console.log(`오늘은 ${dayjs().format("dddd")} 요일입니다.`)  ;

const start = dayjs("2026-01-01")
const end = dayjs("2026-12-31");

const range = [];
for(
    let date = start;
    date.isBefore(end) || date.isSame(end, "day");
    date = date.add(1, "day")
){
    range.push(date.format("YYYY년 MM월 DD일"))
}
console.log(range.length)
