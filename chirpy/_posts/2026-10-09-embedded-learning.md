---
title: STM32 구현 노트 — 학습 목차와 검증 상태
description: C·HAL·CMSIS부터 GPIO·UART·DMA·ADC·Timer·PWM·I2C까지 구현 기록을 모았습니다.
date: 2026-10-09T14:18:37.097Z
categories:
  - STM32 구현 노트
tags:
  - STM32
  - 학습 기록
permalink: /posts/embedded-learning/
pin: true
image:
  path: /assets/img/covers-flat/embedded-learning.png
  alt: "STM32 구현 노트 — 학습 목차와 검증 상태 주제 카드"
---

NUCLEO-F401RE에서 직접 구현한 코드를 기술별로 정리했습니다. C와 HAL·CMSIS의 기반 지식부터 GPIO, UART, DMA, ADC, Timer, PWM, I2C로 이어집니다.

<!-- concept-image -->
![기반 지식부터 주변장치까지의 학습 순서. I2C 실제 장치 응답은 미확인 상태입니다.](/assets/img/concepts/learning-map.svg)
{: .concept-diagram }

기반 지식부터 주변장치까지의 학습 순서. I2C 실제 장치 응답은 미확인 상태입니다.
{: .concept-caption }

그림: 본문 내용을 바탕으로 자체 제작한 흐름도.
{: .concept-credit }

## 학습 글

| 글 | 분류 | 확인 범위 |
| --- | --- | --- |
| [C — GPIO와 명령 버퍼에서 배운 포인터·구조체·정수형](/posts/embedded-c/) | 기반 지식 | 현재 코드의 언어 요소를 설명합니다. 각 주변장치의 보드 검증 상태는 해당 기술 글을 따릅니다. |
| [STM32 HAL — Handle·함수·IRQ·Callback 연결](/posts/stm32-hal/) | 기반 지식 | 현재 코드에 등장하는 HAL API를 정리했습니다. I2C 주소 응답은 아직 확인되지 않았습니다. |
| [CMSIS — __WFI()로 DMA 송신 완료 기다리기](/posts/cmsis-wfi/) | 기반 지식 | 기존 DMA 송신의 보드 검증 기록이 있습니다. 현재 RX Ring Buffer 연결 버전은 보드 재검증이 필요합니다. |
| [C 자료구조 — 문자열 버퍼·Stack·Queue·Ring Buffer](/posts/c-data-structures/) | 기반 지식 | 호스트 CMake·CTest 1/1 통과와 ARM GCC 문법 검사 기록이 있습니다. 호스트 코드는 보드 검증 대상이 아닙니다. |
| [STM32 GPIO — LED 상태와 50ms 버튼 디바운싱](/posts/gpio/) | 주변장치 | 구현·빌드 완료 기록이 있습니다. 초기 B1·LD2·PB5 확인 기록과 별도로 현재 4상태 전체는 보드 추가 확인이 필요합니다. |
| [STM32 UART — 인터럽트 수신과 문자열 LED 명령](/posts/uart/) | 주변장치 | 구현·빌드 완료 기록이 있습니다. 송수신·led red 확인 기록이 있으나 현재 Blocking printf 출력은 보드 추가 확인이 필요합니다. |
| [STM32 DMA — ReceiveToIdle과 RX Ring Buffer](/posts/uart-dma/) | 주변장치 | 기존 UART DMA는 보드 검증 완료 기록이 있습니다. 최신 RX Ring Buffer 연결은 Debug 빌드까지 완료했고 보드 재검증이 필요합니다. |
| [STM32 ADC — CdS 조도 센서와 12-bit 변환](/posts/adc-cds/) | 주변장치 | 구현·빌드·Flash·Verify 및 밝음·어두움 조건의 LED와 UART 출력 확인 기록이 있습니다. |
| [STM32 Timer — TIM2 인터럽트로 500ms 샘플링](/posts/timer-sampling/) | 주변장치 | 구현·빌드·Flash·Verify, 약 500ms UART 출력과 LED 동작 확인 기록이 있습니다. |
| [STM32 PWM — CdS 값으로 LED 밝기 조절하기](/posts/pwm-led/) | 주변장치 | 구현·빌드·Flash·Verify, 밝음·어두움 조건에서 LED 밝기와 UART 출력 변화 확인 기록이 있습니다. |
| [STM32 I2C — 7-bit 주소 스캐너와 검증 상태](/posts/i2c/) | 주변장치 | 구현·Debug 빌드·Flash·Verify 완료 기록이 있습니다. 실제 장치의 주소 응답은 미확인으로, GY-521 준비 후 검증을 재개합니다. |

## 구현과 검증을 구분하기

보드 검증 결과는 저장소의 학습 진도와 프로젝트 기록을 기준으로 옮겼습니다. 이번 게시 작업에서 보드를 다시 시험한 결과는 아닙니다.

- **ADC·Timer·PWM**: 실제 보드 확인 기록이 있습니다.
- **GPIO·UART**: 이전 동작 기록과 현재 버전의 추가 확인 항목을 각 글에 적었습니다.
- **DMA**: 기존 송수신은 확인 기록이 있고, RX Ring Buffer 연결은 Debug 빌드 후 보드 재검증을 앞두고 있습니다.
- **I2C**: 스캐너 코드는 있으나 실제 주소 응답은 확인하지 못했습니다.
- **SPI**: 현재 저장소에서는 구현 전 보류 상태입니다. 이후 단계인 RS-485·W5500·MQTT 등도 이 시리즈의 완료 항목으로 세지 않습니다.

## 공통 실행 흐름

UART 수신과 Timer Interrupt는 IRQ Handler를 거쳐 HAL Callback으로 이어집니다. Timer Callback은 Flag를 세우고 Main Loop가 ADC 측정과 출력을 수행합니다. UART DMA Callback은 RX Ring Buffer에 바이트를 저장하고 Main Loop가 명령을 조립합니다.

[소스 저장소](https://github.com/khs220507/embedded-side-project) · [GPIO부터 읽기](/posts/gpio/)
