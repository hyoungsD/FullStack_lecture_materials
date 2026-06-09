const winston = require("winston");

// 로거 
const logger = winston.createLogger({
    level: "warn" ,  // 어느 중요도까지 기록할지 정하는 장소, 
    format: winston.format.simple(), // 간단한 테스트 형식
    transports: [ // 로거 엔 출력 방향 설정 
        new winston.transports.Console(), // 콘솔로 출력 
        new winston.transports.File({     // 파일 app.log 에 출력한다. 
            filename: "app.log"
        })
    ]
});

console.log("로깅 시작 ")

logger.error("에러발생 - 가장 중요한 에러 메시지")
logger.warn("경고 - 주의가 필요한 메시지")
logger.info("정보 - 일반적인 정보")
logger.debug("디버그 - 개발 중에만 사용하는 메시지")

console.log("로깅 끝")

const simpleLogger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(), 
        winston.format.printf(({timestamp, level, message})=> {
            return `${timestamp} [${level}]: ${message}`
        })
    ),
    transports : [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "temp/sample.log"
        }),
    ]
});

simpleLogger.info("타임스탬프가 포함된 로거 ")