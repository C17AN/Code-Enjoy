---
title: '[SW 문제 해결 기본 - Queue] : SWEA 5097번 회전'
date: 2020-10-06 12:21:13
category: 'PS'
draft: false
---

- 모든 문제의 저작권은 SW Expert Academy에 있습니다.

## 문제

[문제 링크](https://swexpertacademy.com/main/learn/course/lectureProblemViewer.do)

## 풀이 코드

- 기본 리스트를 사용해 해결할 수도 있는 문제지만 `deque`에 익숙해지고자 데크를 사용한 풀이입니다.

```python
from collections import deque

T = int(input())
for i in range(1, T+1):
  N, M = map(int, input().split())
  q = deque(list(map(int, input().split())))
  for j in range(M):
    q.append(q.popleft())
  print('#{} {}'.format(i, q[0]))
```

- 한가지 특이한 점으로는 `split()` 으로 입력을 공백으로 구분할 때 인자로 `' '` 를 사용하면 런타임 오류가 발생합니다. 만약 이 문제에서 런타임 오류를 겪고 계신다면 이 부분을 점검해보시길 바랍니다.
