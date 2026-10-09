---
title: UART·I2C·SPI 한눈에 비교하기
description: 클록, 배선, 장치 선택 방식으로 살펴보는 세 가지 직렬 통신.
date: 2026-10-09T00:00:00.000Z
tags:
  - 임베디드
  - 통신
url: /posts/serial-comparison/
summary: 클록, 배선, 장치 선택 방식으로 살펴보는 세 가지 직렬 통신.
aliases:
  - /기술노트/통신-프로토콜-비교/
---


세 방식 모두 직렬로 데이터를 전달하지만 클록을 맞추는 방법과 대상 장치를 선택하는 방식이 다릅니다. 아래는 일반적인 로직 레벨 연결을 비교한 표이며, 신호선 수에 전원과 GND는 포함하지 않았습니다.

| 항목 | UART | I2C | SPI |
| --- | --- | --- | --- |
| 클록 선 | 없음, 비동기 | SCL 공유 | SCK 사용 |
| 기본 신호 | TX, RX | SDA, SCL | SCK, MOSI, MISO, CS |
| 대상 구분 | 기본적으로 연결된 상대 | 주소 | 보통 장치별 CS |
| 데이터 방향 | 별도 TX·RX로 동시 송수신 가능 | SDA에서 방향을 바꿔 전송 | 기본 4선 구성에서 동시 송수신 가능 |
| 먼저 맞출 설정 | 보율·프레임 | 주소·버스 속도 | 모드·비트 순서·클록 |

비교 기준은 [Microchip UART](https://www.microchip.com/en-us/products/microcontrollers/8-bit-mcus/peripherals/communication-connectivity/uart), [NXP I2C 규격](https://cache.nxp.com/docs/en/user-guide/UM10204.pdf), [Microchip SPI](https://www.microchip.com/en-us/products/microcontrollers/8-bit-mcus/peripherals/communication-connectivity/spi)입니다.

## 각각 자세히 보기

- [UART — 배선, 8N1 프레임과 수신 버퍼](/posts/uart/)
- [I2C — 풀업, 주소와 레지스터 읽기](/posts/i2c/)
- [SPI — 네 신호, 모드와 더미 전송](/posts/spi/)

처음 공부한다면 UART에서 비트와 프레임을 익히고, I2C에서 주소와 응답을, SPI에서 클록 에지와 장치 선택을 살펴보는 순서를 제안합니다.

## 개발할 때 던질 질문

연결할 부품이 지원하는 인터페이스는 무엇인지, 몇 개를 연결하는지, 전송량과 배선 조건은 어떤지부터 확인합니다. 이름만으로 속도나 안정성을 결정하기보다는 실제 장치의 타이밍과 보드 구성을 기준으로 판단해야 합니다.

[소개와 프로젝트 경험으로 돌아가기](/)
