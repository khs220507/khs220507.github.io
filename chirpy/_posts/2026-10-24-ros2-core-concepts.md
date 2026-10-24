---
title: ROS 2 핵심 개념 — 구성 요소와 통신 방식
description: 노드·토픽·메시지·서비스·액션의 정의와 관계를 개념 중심으로 정리합니다.
date: 2026-10-24
tags: [ROS, ROS2, 로봇, 기초]
categories: [ROS, 핵심 개념]
permalink: /posts/ros2-core-concepts/
toc: true
source_note: 블로그/기술노트/ROS/ROS 2 핵심 개념.md
---

**ROS는 로봇 소프트웨어의 기능을 나누어 개발하고 서로 연결하도록 돕는 도구·라이브러리의 생태계입니다.** 기존 운영체제 위에서 사용하는 로봇 소프트웨어 개발 기반입니다.

이 글은 ROS 2의 구성 요소와 통신 방식, 개념 사이의 관계를 설명합니다. 아래 개념 애니메이션은 ROS 2 Jazzy 공식 자료이며, 인터넷 연결이 필요합니다.

## 1. ROS의 역할

ROS는 기능을 **노드**로 나누고, 정해진 **메시지 타입**과 **통신 방식**으로 연결합니다. 각 기능은 다른 기능의 내부 구현 대신, 주고받는 데이터의 형식과 의미를 기준으로 협력합니다.

## 2. 노드 — 하나의 역할을 맡는 실행 구성 요소

**노드(Node)는 ROS 통신에 참여하는 기능 단위**입니다. 논리적인 역할을 기준으로 나눕니다.

노드는 클래스나 실행 파일과 반드시 일대일로 대응하지 않습니다. **한 프로세스 안에 여러 노드**를 둘 수도 있고, 서로 다른 PC에 있는 노드끼리 통신할 수도 있습니다. 한 노드가 데이터를 받으면서 다른 데이터를 보내는 것도 가능합니다. [공식 노드 문서 원문](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Basic/About-Nodes.rst)

여기서 **ROS 그래프(Graph)**는 노드와 그 연결 관계를 뜻합니다.

### 그림 1. 여러 노드가 함께 일하는 전체 모습

![ROS 2 노드들이 토픽과 서비스로 메시지를 교환하는 공식 개념 애니메이션](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/images/Nodes-TopicandService.gif)

**그림 읽기:** 먼저 각각의 `Node`를 서로 다른 담당자로 보세요. 이어서 연결된 선을 따라 데이터가 어디에서 어디로 이동하는지 확인하세요. 한 노드는 여러 통신에 참여할 수 있습니다. 이 그림의 핵심은 **로봇 전체를 하나의 거대한 프로그램으로만 생각하지 않고, 역할과 연결로 나누어 보는 것**입니다.

출처: ROS 2 Documentation contributors, [Understanding nodes](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.rst), CC BY 4.0. 원본 GIF.

## 3. 토픽과 메시지 — 어디로 보내고, 어떤 형식으로 보낼까

**토픽(Topic)은 데이터를 주고받는 이름 있는 통신 경로**, **메시지(Message)는 그 경로로 전달되는 데이터**입니다.

발행자는 특정 수신자에게 직접 호출하지 않고 토픽에 메시지를 발행합니다. 구독자는 관심 있는 토픽을 구독합니다. 하나의 토픽에 여러 발행자와 구독자가 연결될 수 있습니다.

### 그림 2. 발행자 하나와 구독자 하나

![하나의 발행자에서 하나의 구독자로 토픽 메시지가 흐르는 애니메이션](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/images/Topic-SinglePublisherandSingleSubscriber.gif)

**그림 읽기:** `Publisher`는 보내는 쪽, `Subscriber`는 받는 쪽입니다. 이 통신에는 서비스처럼 요청 하나마다 응답을 돌려주는 절차가 없습니다.

### 그림 3. 여러 발행자와 여러 구독자

![여러 발행자와 구독자가 하나의 토픽을 통해 연결되는 애니메이션](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/images/Topic-MultiplePublisherandMultipleSubscriber.gif)

**그림 읽기:** 이번에는 연결된 참여자가 늘어납니다. 하나의 토픽에 여러 발행자와 구독자가 연결될 수 있습니다.

그림 2–3 출처: ROS 2 Documentation contributors, [Understanding topics](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.rst), CC BY 4.0. 원본 GIF.

세 가지를 구분하면 이해가 쉬워집니다.

| 구분 | 의미 |
| --- | --- |
| 토픽 이름 | 통신 경로의 식별자 |
| 메시지 타입 | 데이터 필드와 자료형을 정의한 구조 |
| 메시지 값 | 실제로 전달되는 데이터의 내용 |

토픽 이름뿐 아니라 메시지 타입과 QoS도 호환되어야 합니다. 토픽은 지속적인 데이터 전달에 적합하며, 메시지 발행 자체가 수신 측의 처리 완료를 뜻하지는 않습니다.

## 4. 서비스 — 요청 한 번과 응답 한 번

**서비스(Service)는 클라이언트가 요청을 보내면 서버가 처리 후 응답을 돌려주는 방식**입니다.

### 그림 4. 요청을 보내고 응답 받기

![서비스 클라이언트가 요청을 보내고 서버가 응답을 돌려주는 애니메이션](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/images/Service-SingleServiceClient.gif)

**그림 읽기:** `Request`는 요청, `Response`는 응답입니다. 토픽 그림과 달리 **요청이 가는 방향과 응답이 돌아오는 방향**을 함께 보세요.

### 그림 5. 하나의 서비스에 여러 클라이언트

![여러 서비스 클라이언트가 하나의 서비스 서버에 요청하는 애니메이션](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/images/Service-MultipleServiceClient.gif)

**그림 읽기:** 여러 클라이언트가 같은 서비스에 각각 요청할 수 있습니다. 응답은 모든 구독자에게 방송하는 데이터가 아니라 **각 요청에 대응하는 결과**입니다. 그림만으로 서버가 모든 요청을 동시에 실행한다고 해석하지는 마세요. 실행 방식은 구현에 따라 달라집니다.

그림 4–5 출처: ROS 2 Documentation contributors, [Understanding services](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.rst), CC BY 4.0. 원본 GIF.

빠르게 끝나는 요청·응답 작업에 어울립니다. 요청과 응답은 서로 다른 데이터 구조를 가질 수 있습니다. 비동기 호출을 사용하면 응답을 기다리는 동안 호출 측이 다른 일을 할 수도 있습니다.

서비스는 진행 피드백과 취소를 기본 통신 구조로 제공하지 않습니다. 시간이 긴 작업에는 다음의 액션이 적합합니다. [공식 서비스 문서 원문](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Basic/About-Services.rst)

## 5. 액션 — 목표를 주고 진행 상황과 결과 받기

**액션(Action)은 시간이 걸리는 작업의 목표·진행 피드백·최종 결과를 다루는 방식**입니다. 취소 요청도 지원합니다.

### 그림 6. 목표 전달 → 진행 피드백 → 최종 결과

![액션 클라이언트와 서버 사이의 목표 피드백 결과 흐름을 보여 주는 애니메이션](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/images/Action-SingleActionClient.gif)

**그림 읽기:** `Goal`은 수행할 목표, `Feedback`은 수행 중 상태, `Result`는 최종 결과입니다. **피드백을 받았다는 사실은 완료를 뜻하지 않습니다.**

출처: ROS 2 Documentation contributors, [Understanding actions](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.rst), CC BY 4.0. 원본 GIF.

목표 수락은 작업 완료와 다릅니다. 수행 중 실패하거나 취소될 수도 있습니다. 취소 역시 요청을 보냈다고 즉시 물리적으로 멈췄다는 뜻은 아닙니다. 서버의 처리와 장비의 실제 상태를 구분해야 합니다. [공식 액션 문서 원문](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Basic/About-Actions.rst)

세 통신 방식은 상호작용의 성격에 따라 구분됩니다.

| 방식 | 기본 구조 | 주된 목적 |
| --- | --- | --- |
| 토픽 | 발행·구독 | 지속적인 데이터 전달 |
| 서비스 | 요청·응답 | 짧은 작업의 처리 결과 반환 |
| 액션 | 목표·피드백·결과 | 장시간 작업의 진행 관리와 취소 |

## 6. 콜백과 실행기

**콜백(Callback)**은 특정 사건에 대응해 실행되는 함수입니다. **실행기(Executor)**는 준비된 콜백을 실행하도록 관리합니다. 오래 걸리는 콜백은 실행기 구성에 따라 다른 처리를 지연시킬 수 있습니다.

노드가 기능과 통신의 단위라면, 콜백과 실행기는 그 기능이 실제로 처리되는 실행 구조에 해당합니다.

## 7. 함께 나오는 용어를 한 장으로 정리

| 용어 | 역할 |
| --- | --- |
| 패키지(Package) | 코드·설정·의존성 등을 묶는 단위 |
| 워크스페이스(Workspace) | 패키지를 모아 개발·빌드하는 작업 공간 |
| 파라미터(Parameter) | 노드의 설정값 |
| 런치(Launch) | 여러 노드와 설정을 함께 실행하는 구성 |
| 실행기(Executor) | 메시지·타이머 등의 콜백 실행 관리 |
| QoS | 전달 신뢰성·보관 등 통신 정책 |
| tf2 | 좌표계 사이의 변환 관리 |
| RViz | 로봇 상태와 센서 데이터 시각화 |
| rosbag2 | 토픽 데이터 기록·재생 |

패키지와 워크스페이스는 개발 구성을, 파라미터와 런치는 실행 구성을 다룹니다. 노드와 통신 방식은 기능들이 협력하는 구조를 이룹니다.

## 8. ROS 1 자료와 섞어 읽을 때 주의할 점

ROS 2는 ROS 1의 Master를 시작하는 방식과 차이가 있습니다.

ROS 2에서는 하부 미들웨어가 노드 발견과 연결을 처리합니다. 대표적인 DDS 기반 구성에서는 같은 ROS 도메인의 참여자를 발견하고, 호환되는 통신 설정을 바탕으로 연결합니다. 따라서 **같은 공유기에 연결했다는 사실만으로 통신이 보장되지는 않습니다.** 도메인 설정과 네트워크 조건도 확인해야 합니다. [공식 Discovery 문서 원문](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Basic/About-Discovery.rst)

QoS도 중요한 차이입니다. 발행자와 구독자의 통신 정책이 호환되지 않으면 연결되지 않을 수 있습니다. `Reliable`은 재전송 등을 통한 전달 신뢰성 정책이지, 구동 명령의 실행 완료나 실시간 마감 준수를 보장하는 설정이 아닙니다. [공식 QoS 문서 원문](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Intermediate/About-Quality-of-Service-Settings.rst)

## 9. ROS와 하드웨어 통신의 관계

ROS는 소프트웨어 기능 사이의 연결을 도와줍니다. 실제 장비와 통신하는 드라이버와 하드웨어 인터페이스는 별도로 존재합니다. 장비 명령 형식과 통신 오류 처리는 여전히 필요합니다. 관련 기초는 [UART](/posts/uart/), [TCP-IP](/posts/tcp-ip/), [통신 프로토콜 비교](/posts/serial-comparison/)에서 이어 볼 수 있습니다.

노드는 기능을 맡고, 메시지는 전달되는 데이터를 담습니다. 토픽·서비스·액션은 기능 사이의 상호작용을 정의합니다. 메시지 전달과 실제 장비의 동작 완료는 구분됩니다.

## 그림 출처와 이용 조건

외부 개념 애니메이션 6개는 **ROS 2 Documentation contributors**의 공식 Jazzy 문서 저장소에서 가져온 원본입니다. 이미지 자체는 수정하지 않았으며, 한국어 해설은 이 글에서 추가했습니다. 문서 저장소의 [라이선스](https://github.com/ros2/ros2_documentation/blob/jazzy/LICENSE)는 [Creative Commons Attribution 4.0 International — CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)입니다. 각 그림 아래의 출처에서 해당 설명과 원본을 함께 확인할 수 있습니다.
