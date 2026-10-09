---
title: STM32에서 사용한 통신 한눈에 보기
description: UART·RS-485·I2C·SPI와 W5500 Ethernet·TCP/IP를 연결 관계별로 정리합니다.
date: 2026-10-09T00:00:00.000Z
tags:
  - 임베디드
  - 통신
url: /posts/serial-comparison/
summary: UART·RS-485·I2C·SPI와 W5500 Ethernet·TCP/IP를 연결 관계별로 정리합니다.
aliases:
  - /기술노트/통신-프로토콜-비교/
---


STM32 프로젝트에서 다룬 통신은 모두 같은 층위가 아닙니다. UART·I2C·SPI는 MCU와 주변장치 사이의 인터페이스, RS-485는 배선의 전기적 방식, Ethernet·IP·TCP는 네트워크에서 링크부터 전송까지의 역할을 맡습니다.

```text
MCU UART ─ 트랜시버 ─ RS-485 배선 ─ 다른 장치
MCU I2C  ──────────── MPU6050 센서
MCU SPI  ─ W5500 ─ Ethernet ─ IP ─ TCP ─ PC
```

## 전체 역할 비교

| 기술 | 핵심 역할 | 프로젝트에서 연결한 대상 |
| --- | --- | --- |
| [UART](/posts/uart/) | 비동기 바이트 송수신 | PC 로그·명령, RS-485 트랜시버 쪽 UART |
| [RS-485](/posts/rs-485/) | 차동 신호를 통한 장치 간 배선 | 제어보드와의 통신 경로 |
| [I2C](/posts/i2c/) | 두 신호선과 주소로 센서 레지스터 접근 | MPU6050 |
| [SPI](/posts/spi/) | 클록·칩 선택을 이용한 주변장치 접근 | W5500 |
| [Ethernet과 W5500](/posts/ethernet-w5500/) | W5500을 통한 유선 네트워크 링크 | PC와 네트워크 연결 |
| [TCP-IP](/posts/tcp-ip/) | IP 주소·포트로 연결하고 순서 있는 바이트 전달 | PC 통신·장비 제어 메시지 |

## MCU 근거리 인터페이스 비교

UART·I2C·SPI는 모두 직렬로 데이터를 전달하지만 클록과 상대를 선택하는 방식이 다릅니다. 아래 신호선 수에 전원과 GND는 포함하지 않았습니다.

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
- [RS-485 — UART와 트랜시버, 반이중 통신](/posts/rs-485/)
- [Ethernet·W5500 — SPI 뒤의 네트워크](/posts/ethernet-w5500/)
- [TCP/IP — 소켓과 메시지 경계](/posts/tcp-ip/)

처음 공부한다면 UART에서 비트와 프레임을 익히고, RS-485에서 전기적 배선을, I2C·SPI에서 장치별 접근 방식을 본 뒤 W5500과 TCP로 범위를 넓혀 볼 수 있습니다.

## 개발할 때 던질 질문

연결할 부품이 지원하는 인터페이스는 무엇인지, 몇 개를 연결하는지, 전송량과 배선 조건은 어떤지부터 확인합니다. 통신 문제를 찾을 때는 전원·배선부터 메시지 파서까지 순서대로 확인하는 편이 효율적입니다.

[경력과 프로젝트 경험 보기](/about/) · [블로그 첫 화면](/)
