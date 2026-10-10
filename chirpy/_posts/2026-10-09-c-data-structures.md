---
title: C 자료구조 — 문자열 버퍼·Stack·Queue·Ring Buffer
description: 배열 경계와 FIFO·LIFO, 원형 인덱스를 호스트 C 코드로 구현했습니다.
date: 2026-10-09T14:18:37.097Z
categories:
  - STM32 구현 노트
  - 기반 지식
tags:
  - STM32
  - 자료구조
permalink: /posts/c-data-structures/
toc: true
source_note: blog/fundamentals/Data_Structures.md
image:
  path: /assets/img/covers-flat/c-data-structures.png
  alt: "C 자료구조 — 문자열 버퍼·Stack·Queue·Ring Buffer 주제 카드"
---

> **검증 상태** · 호스트 CMake·CTest 1/1 통과와 ARM GCC 문법 검사 기록이 있습니다. 호스트 코드는 보드 검증 대상이 아닙니다.
{: .prompt-info }

[학습 목차](/posts/embedded-learning/) · [소스 저장소](https://github.com/khs220507/embedded-side-project)

## 배열·문자열 Command Buffer

### 구현 목표

`09_DataStructures_Basic`에서 고정 길이 배열로 UART 명령과 같은 문자열을 안전하게 모은다. 이 단계는 다음 `03_UART_DMA` 수신 Buffer 확장의 기반이다.

### 핵심 코드

```c
typedef struct
{
    char data[COMMAND_BUFFER_CAPACITY];
    size_t length;
} CommandBuffer;
```

`command_buffer_append()`는 일반 문자를 배열에 추가하고 항상 마지막에 `\0`을 둔다. `\n`은 저장하지 않고 명령 완료 상태를 반환한다. 길이가 `COMMAND_BUFFER_CAPACITY - 1`이면 문자를 더 저장하지 않고 `COMMAND_BUFFER_FULL`을 반환한다.

### 코드 설명

- `data`의 마지막 칸은 C 문자열 끝을 뜻하는 `\0` 전용이다. 따라서 용량이 16이면 실제 문자는 최대 15개다.
- `length`를 별도로 관리하면 매번 문자열 전체를 검색하지 않고 다음 저장 위치를 알 수 있다.
- Overflow를 감지한 뒤 기존 내용을 유지하므로 배열 경계를 벗어나 메모리를 덮어쓰지 않는다.

### 실행 결과

- `arm-none-eabi-gcc`로 `-Wall -Wextra -Wpedantic -Werror` 조건의 문법·경고 검사를 통과했다.
- MSVC Build Tools에서 호스트 CMake 빌드와 CTest를 실행했고, 1개 테스트가 통과했다.
- 이 챕터는 PC에서 실행하는 C 코드이므로 보드 검증 대상이 아니다. 별도 UART DMA 연결 코드는 구현·Debug 빌드 후 보드 재검증을 앞두고 있다.

### 배운 점

임베디드에서는 고정 배열의 경계 검사와 `\0` 예약이 문자열 처리의 기본 안전 장치다. 이후 원형 버퍼는 이 배열·Index·길이 관리 개념을 확장한다.

### 한 줄 정리

고정 길이 Command Buffer는 배열 범위를 지키면서 한 줄 명령을 모으는 가장 단순한 자료구조다.

## DS-01에서 확인한 32-bit·64-bit와 구조체 크기

### 구현 목표

`09_DataStructures_Basic`의 `CommandBuffer` 선언을 기준으로 배열 크기, `size_t`, CPU bit 수, 구조체 크기의 관계를 구분한다.

### 핵심 코드

```c
#define COMMAND_BUFFER_CAPACITY 16U

typedef struct
{
    char data[COMMAND_BUFFER_CAPACITY];
    size_t length;
} CommandBuffer;
```

### 32-bit와 64-bit

보통 PC 설정에서 `x86`은 32-bit, `x64`는 64-bit CPU·실행 환경을 뜻한다. `x32`라는 표기는 일반적인 CPU 이름으로는 쓰지 않으므로, 여기서는 32-bit 환경을 `x86` 또는 32-bit라고 부른다.

| 실행 환경 | 주소·포인터 크기 | 이 학습과의 관계 |
|---|---:|---|
| PC x64 (MSVC) | 보통 8byte | `size_t`도 보통 8byte |
| STM32F401RE (32-bit ARM Cortex-M4) | 4byte | `size_t`도 4byte |

`size_t`는 배열의 길이와 메모리 크기를 표현하는 unsigned 자료형이다. 정확한 byte 수는 컴파일 대상에 따라 달라지므로, 고정 폭이 필요한 통신 데이터에는 `uint32_t`처럼 크기가 이름에 있는 자료형을 사용한다.

### `CommandBuffer` 크기 계산

`char`는 1byte이므로 `data[16]`은 항상 16byte다. 구조체 전체에는 `length`도 포함된다.

```text
PC x64의 일반적인 계산
data[16]  : 16byte
size_t    :  8byte
합계      : 24byte

STM32F401RE의 일반적인 계산
data[16]  : 16byte
size_t    :  4byte
합계      : 20byte
```

구조체 멤버의 순서와 CPU 정렬 규칙에 따라 Padding byte가 들어갈 수도 있다. 정확한 전체 크기는 대상 환경에서 `sizeof(CommandBuffer)`로 확인한다. 현재 DS-01은 `sizeof()` 값을 출력하지 않았으므로, 위 값은 자료형 크기에 따른 계산이며 실행 출력으로 검증한 값은 아니다.

### 빌드 상태

- PC x64 MSVC Build Tools에서 CMake 빌드와 CTest 1개 통과
- STM32CubeIDE의 ARM GCC에서 문법·경고 검사 통과
- 이 챕터는 PC C 학습 코드이므로 STM32 보드 다운로드·검증은 하지 않음

### 배운 점

- 배열의 칸 수는 `COMMAND_BUFFER_CAPACITY`가 컴파일 전에 정한다.
- `data` 배열의 크기와 구조체 전체 크기는 다르다.
- 같은 C 코드라도 PC x64와 STM32 32-bit ARM에서 `size_t`·포인터 크기가 달라질 수 있다.

### 한 줄 정리

`CommandBuffer`의 문자 배열은 항상 16byte지만, `size_t`와 정렬 규칙 때문에 전체 구조체 크기는 빌드 대상에 따라 달라진다.

---

## 배열 기반 Stack: `push()`와 `pop()`

### 구현 목표

`09_DataStructures_Basic/src/main.c`에서 고정 크기 배열로 Stack을 구현하고, `LIFO` 순서와 Empty 상태를 테스트한다.

### 핵심 코드

```c
#define STACK_CAPACITY 4U

typedef struct
{
    int data[STACK_CAPACITY];
    size_t top;
} Stack;

static StackResult stack_push(Stack *stack, int value)
{
    if (stack->top >= STACK_CAPACITY)
    {
        return STACK_FULL;
    }

    stack->data[stack->top] = value;
    stack->top++;
    return STACK_OK;
}

static StackResult stack_pop(Stack *stack, int *value)
{
    if (stack->top == 0U)
    {
        return STACK_EMPTY;
    }

    stack->top--;
    *value = stack->data[stack->top];
    return STACK_OK;
}
```

### 코드 설명

Stack은 `LIFO(Last In, First Out)` 구조다. `top`은 다음 값을 저장할 배열 위치이며, `push()`는 저장 후 `top`을 증가시킨다. `pop()`은 먼저 `top`을 감소시킨 뒤 그 위치의 값을 꺼낸다.

```text
push(10) → push(20) → pop() = 20 → pop() = 10
```

`top == STACK_CAPACITY`이면 `STACK_FULL`, `top == 0`이면 `STACK_EMPTY`를 반환한다. `stack_pop()`의 `int *value`는 꺼낸 값을 호출한 쪽 변수에 기록하기 위한 출력 포인터다.

### 동작 흐름 또는 실행 결과

`test_stack_lifo()`에서 10과 20을 순서대로 저장한 뒤 꺼내면 20, 10 순서로 반환된다. 빈 Stack에서 다시 꺼내면 `STACK_EMPTY`가 반환된다. 호스트 CMake 빌드와 CTest는 `1/1` 통과했다.

### 배운 점

- Stack의 핵심은 데이터가 아니라 삽입·삭제 순서인 LIFO다.
- 고정 배열에서는 `top` 경계 검사가 Overflow를 막는다.
- `pop()`은 Empty 상태를 먼저 검사해야 배열의 음수 인덱스 접근을 피할 수 있다.

### 한 줄 정리

배열 기반 Stack은 `top` 하나로 LIFO 순서를 관리하며, `push()`와 `pop()`에서 Full·Empty 경계를 검사한다.

---

## 배열 기반 Queue: `enqueue()`와 `dequeue()`

### 구현 목표

`09_DataStructures_Basic/src/main.c`에서 고정 크기 배열로 Queue를 구현하고, `FIFO` 순서와 Empty 상태를 테스트한다.

### 핵심 코드

```c
#define QUEUE_CAPACITY 4U

typedef struct
{
    int data[QUEUE_CAPACITY];
    size_t head;
    size_t tail;
    size_t count;
} Queue;

static QueueResult queue_enqueue(Queue *queue, int value)
{
    if (queue->tail >= QUEUE_CAPACITY)
    {
        return QUEUE_FULL;
    }

    queue->data[queue->tail] = value;
    queue->tail++;
    queue->count++;
    return QUEUE_OK;
}

static QueueResult queue_dequeue(Queue *queue, int *value)
{
    if (queue->count == 0U)
    {
        return QUEUE_EMPTY;
    }

    *value = queue->data[queue->head];
    queue->head++;
    queue->count--;

    if (queue->count == 0U)
    {
        queue->head = 0U;
        queue->tail = 0U;
    }

    return QUEUE_OK;
}
```

### 코드 설명

Queue는 `FIFO(First In, First Out)` 구조다. `head`는 꺼낼 위치, `tail`은 다음에 저장할 위치, `count`는 현재 저장된 데이터 수를 나타낸다.

```text
enqueue(10) → enqueue(20) → dequeue() = 10 → dequeue() = 20
```

이번 기본 Queue는 `tail`이 배열 끝에 도달하면 `QUEUE_FULL`을 반환한다. Queue가 완전히 비면 `head`와 `tail`을 0으로 되돌려 다음 입력을 배열 처음부터 받을 수 있게 한다. 인덱스를 배열 끝에서 처음으로 순환시키는 확장은 아래 Ring Buffer 절에서 다룬다.

### 동작 흐름 또는 실행 결과

`test_queue_fifo()`에서 10과 20을 순서대로 넣은 뒤 꺼내면 10, 20 순서로 반환된다. 빈 Queue에서 다시 꺼내면 `QUEUE_EMPTY`가 반환된다. 호스트 CMake 빌드와 CTest는 `1/1` 통과했다.

### 배운 점

- Queue의 핵심은 FIFO 순서다.
- `head`와 `tail`을 분리하면 저장 위치와 꺼낼 위치를 독립적으로 관리할 수 있다.
- `count == 0` 검사는 Empty 상태를 안전하게 처리한다.
- 배열 끝을 넘어 다시 처음으로 연결하는 기능은 Ring Buffer의 역할이다.

### 한 줄 정리

배열 기반 Queue는 `head`, `tail`, `count`로 FIFO 순서를 관리하며, 기본 구현에서는 배열 끝과 Empty 경계를 검사한다.

## 원형 버퍼(Ring Buffer)

<!-- concept-image -->
![원형 버퍼의 유효 데이터 구간과 양 끝 위치. 숫자 없는 칸은 비어 있으며, 배열 마지막 다음을 처음으로 연결하는 인덱스 관리를 시각화합니다.](/assets/img/concepts/ring-buffer.png)
{: .concept-diagram }

원형 버퍼의 유효 데이터 구간과 양 끝 위치. 숫자 없는 칸은 비어 있으며, 배열 마지막 다음을 처음으로 연결하는 인덱스 관리를 시각화합니다.
{: .concept-caption }

그림: [Cburnett · Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Circular_buffer_-_XX123XX_with_pointers.svg) · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) · 공식 PNG 미리보기 사용 · 내용 변경 없음.
{: .concept-credit }

### 기본 개념

일반 Queue는 데이터를 꺼낸 뒤 앞쪽 빈 공간을 다시 사용하려면 배열을 이동하거나 별도 정리가 필요하다. Ring Buffer는 배열의 마지막 Index 다음을 0번 Index로 연결해, `head`와 `tail`이 배열을 순환하도록 만든 고정 크기 FIFO 구조다.

### 구현 목표

- `head`는 다음에 꺼낼 데이터의 위치를 가리킨다.
- `tail`은 다음에 저장할 위치를 가리킨다.
- `count`로 Empty와 Full을 구분한다.
- 데이터를 꺼낸 뒤 생긴 앞쪽 빈 칸을 `tail`이 다시 사용한다.

### 핵심 코드

```c
#define RING_BUFFER_CAPACITY 4U

typedef struct
{
    int data[RING_BUFFER_CAPACITY];
    size_t head;
    size_t tail;
    size_t count;
} RingBuffer;
```

```c
buffer->data[buffer->tail] = value;
buffer->tail = (buffer->tail + 1U) % RING_BUFFER_CAPACITY;
buffer->count++;
```

`ring_buffer_enqueue()`는 먼저 `count`를 검사해 Full이면 저장하지 않는다. 저장 후 `tail`을 1 증가시키고 `% RING_BUFFER_CAPACITY`로 배열 끝에서 0으로 되돌린다. `ring_buffer_dequeue()`도 같은 방식으로 `head`를 순환시키며 가장 오래된 값을 반환한다.

### 동작 흐름

```text
enqueue: data[tail] 저장 → tail 순환 → count 증가
dequeue: data[head] 반환 → head 순환 → count 감소
```

예를 들어 용량 4에서 `10, 20, 30`을 저장하고 `10`을 꺼낸 뒤 `40`을 저장하면, `tail`이 3에서 0으로 돌아간다. 이어 `50`을 저장할 때 앞쪽 빈 칸을 다시 사용한다. 이때 데이터 순서는 `20, 30, ...`로 유지되므로 배열 Index의 물리적 순서와 논리적 FIFO 순서는 다를 수 있다.

### 실행 결과

- `head`, `tail`, `count`가 초기화되는지 확인했다.
- `10, 20, 30, 40, 50`의 FIFO 순서와 `tail`의 Wrap-around를 확인했다.
- Full 상태에서 새 데이터를 거부하고 Empty 상태에서 꺼내기를 거부하는 테스트를 통과했다.
- 호스트 CMake·CTest는 1/1 통과했으며, STM32 실제 보드 검증은 하지 않았다.

### 배운 점

`count`를 함께 두면 `head == tail`만으로는 구분하기 어려운 Empty와 Full을 명확하게 판단할 수 있다. 현재 구현은 단일 실행 흐름의 일반 C 구조이며, UART DMA Interrupt와 Main Loop가 동시에 접근하는 단계에서는 공유 Index의 원자성, `volatile` 필요성, 임계 구역을 별도로 검토해야 한다.

### 한 줄 정리

Ring Buffer는 배열을 이동하지 않고 `head`와 `tail`을 순환시켜 고정 메모리에서 FIFO를 구현하는 자료구조다.


<!-- explain:ring-wrap -->
![용량 4의 count 방식 예시입니다. Full일 때도 head와 tail이 같을 수 있으므로 count를 함께 봅니다. UART RX의 한 칸 비우는 구현과는 다릅니다.](/assets/img/explain/ring-wrap.svg)
{: .concept-diagram }

용량 4의 count 방식 예시입니다. Full일 때도 head와 tail이 같을 수 있으므로 count를 함께 봅니다. UART RX의 한 칸 비우는 구현과는 다릅니다.
{: .concept-caption }

*본문의 코드와 예시를 바탕으로 직접 구성한 설명도.*
{: .concept-credit }

## UART DMA 연결 상태

현재 `03_UART_DMA`에는 바이트 Ring Buffer 연결 코드가 있으며 Debug 빌드 완료 기록이 있습니다. 호스트 학습용 `count` 방식과 달리 UART 버전은 한 칸을 비우는 방식으로 128칸 중 127바이트를 사용합니다. 최신 버전의 보드 검증은 아직 필요합니다. [DMA 구현 글](/posts/uart-dma/)에서 확인할 수 있습니다.
