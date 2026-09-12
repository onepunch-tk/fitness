#!/bin/bash
# 아키텍처 리뷰 오케스트레이터
#   1) 로컬 브랜치 head 스냅샷을 이전 상태와 비교해 새 브랜치/커밋 감지 (또는 인자로 받은 range 사용)
#   2) 검사할 범위가 있으면 Herdr 새 pane에 cc(claude bypass 모드) 리뷰어를 띄워 검사 위임
#   3) 결과 파일 경로를 stdout에 출력
#
# 사용: arch-review.sh [<git-range>]
# 출력(마지막 줄): BASELINE | NO_CHANGE | META_ONLY | RESULT=<path> | ERROR: ...
set -u

[ "${HERDR_ENV:-}" = 1 ] || { echo "ERROR: Herdr 밖에서 실행됨 (HERDR_ENV != 1)"; exit 1; }

REPO=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "ERROR: git 리포지토리가 아님"; exit 1; }
cd "$REPO" || exit 1
DIR="$(git rev-parse --absolute-git-dir)/arch-review"
mkdir -p "$DIR"
STATE="$DIR/state.txt"
TS=$(date +%Y%m%d-%H%M%S)
REQ="$DIR/request-$TS.md"
RES="$DIR/result-$TS.md"
EXPLICIT_RANGE="${1:-}"

# 기본 브랜치 (origin/HEAD → main → master)
BASE_BRANCH=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##')
[ -n "$BASE_BRANCH" ] || { git show-ref --verify -q refs/heads/main && BASE_BRANCH=main; }
[ -n "$BASE_BRANCH" ] || { git show-ref --verify -q refs/heads/master && BASE_BRANCH=master; }
[ -n "$BASE_BRANCH" ] || { echo "ERROR: 기본 브랜치(main/master)를 찾을 수 없음"; exit 1; }

# 규칙 문서
RULES_DOC=""
for f in AGENTS.md CLAUDE.md; do [ -f "$REPO/$f" ] && { RULES_DOC="$f"; break; }; done
[ -n "$RULES_DOC" ] || { echo "ERROR: 리포지토리 루트에 AGENTS.md 또는 CLAUDE.md 가 없음 (평가 기준 문서 필요)"; exit 1; }

CHANGES=""

if [ -n "$EXPLICIT_RANGE" ]; then
  # ---- 명시적 범위 ----
  git rev-parse --verify -q "${EXPLICIT_RANGE##*..}" >/dev/null || { echo "ERROR: 잘못된 range: $EXPLICIT_RANGE"; exit 1; }
  CHANGES+="- 지정 범위 — 검사 범위: \`$EXPLICIT_RANGE\`"$'\n'
  CHANGES+="$(git log --oneline "$EXPLICIT_RANGE" | sed 's/^/    /')"$'\n'
else
  # ---- 자동 감지 ----
  git for-each-ref --format='%(refname:short) %(objectname)' refs/heads/ | sort > "$DIR/current.txt"

  if [ ! -f "$STATE" ]; then
    cp "$DIR/current.txt" "$STATE"
    echo "BASELINE"; cat "$STATE"; exit 0
  fi

  while read -r branch sha; do
    prev=$(awk -v b="$branch" '$1==b{print $2}' "$STATE")
    if [ -z "$prev" ]; then
      base=$(git merge-base "$BASE_BRANCH" "$sha" 2>/dev/null || echo "")
      if [ -z "$base" ] || [ "$base" = "$sha" ]; then
        CHANGES+="- NEW 브랜치 \`$branch\` ($(git rev-parse --short "$sha")) — $BASE_BRANCH 대비 추가 커밋 없음"$'\n'
      else
        CHANGES+="- NEW 브랜치 \`$branch\` — 검사 범위: \`$base..$sha\`"$'\n'
        CHANGES+="$(git log --oneline "$base..$sha" | sed 's/^/    /')"$'\n'
      fi
    elif [ "$prev" != "$sha" ]; then
      if git merge-base --is-ancestor "$prev" "$sha" 2>/dev/null; then
        range="$prev..$sha"
      else
        range="$(git merge-base "$BASE_BRANCH" "$sha")..$sha"
        CHANGES+="- (히스토리 재작성 감지: \`$branch\`)"$'\n'
      fi
      CHANGES+="- UPDATED 브랜치 \`$branch\` — 검사 범위: \`$range\`"$'\n'
      CHANGES+="$(git log --oneline "$range" | sed 's/^/    /')"$'\n'
    fi
  done < "$DIR/current.txt"

  while read -r branch sha; do
    if ! awk -v b="$branch" '$1==b{f=1} END{exit !f}' "$DIR/current.txt"; then
      CHANGES+="- DELETED 브랜치 \`$branch\`"$'\n'
    fi
  done < "$STATE"

  if [ -z "$CHANGES" ]; then
    echo "NO_CHANGE"; exit 0
  fi

  if ! grep -q "검사 범위" <<<"$CHANGES"; then
    cp "$DIR/current.txt" "$STATE"
    echo "META_ONLY"; printf '%s' "$CHANGES"; exit 0
  fi
fi

# ---- 리뷰 요청 파일 ----
cat > "$REQ" <<REQEOF
# 아키텍처 리뷰 요청 ($TS)

리포지토리: $REPO
평가 기준: 이 리포지토리의 $RULES_DOC 에 적힌 아키텍처 규칙. 먼저 $RULES_DOC 를 읽어라.

## 변경 감지 내역
$CHANGES
## 검사 지침
1. 위 각 "검사 범위"에 대해 \`git log <range>\` 와 \`git diff <range>\` 를 직접 실행해 변경 내용을 확인하라. 필요하면 관련 파일 전체를 읽어라.
2. $RULES_DOC 의 규칙 관점에서만 평가하라. 보통 다음을 본다:
   - 계층 간 의존 방향과 경계 (presentation/application/domain/infrastructure 등 문서가 정의한 계층)
   - 폴더 구조와 파일명 규칙이 문서와 일치하는지
   - 도메인 모델링: 엔티티 불변식, 도메인 예외, 유스케이스가 포트(인터페이스)에만 의존하는지, 도메인 경계가 적절한지
   - 조립(composition/DI)이 문서가 정한 한 곳에서만 일어나는지
   - 문서가 금지한 행동을 위반했는지
3. 코드 스타일·포매팅·취향 문제는 제외. 아키텍처와 도메인 모델링 관점만 다룬다.
4. 파일을 수정하거나 커밋하지 마라. 읽기 전용 검사다. (타입 체크나 lint 실행은 허용)
5. 결과를 아래 형식의 Markdown으로 \`$RES\` 에 작성하라.

## 결과 형식
\`\`\`
## 요약
(2~3줄)

## 발견 사항
### 1. [높음|중간|낮음] 한 줄 제목
- 위치: 파일경로:라인
- 문제: ...
- 제안: ...

## 잘한 점
- ...
\`\`\`
발견 사항이 없으면 "발견 사항 없음"이라고 명시하라. 작성 완료 후 최종 응답은 결과 파일 경로 한 줄만 출력하라.
REQEOF

# ---- 리뷰어 pane 오케스트레이션 ----
PANE=$(herdr pane split --pane "$HERDR_PANE_ID" --direction right --cwd "$REPO" --no-focus | jq -r '.result.pane.pane_id')
[ -z "$PANE" ] || [ "$PANE" = "null" ] && { echo "ERROR: pane split 실패"; exit 1; }
echo "PANE=$PANE" >&2

herdr pane run "$PANE" "cc" >/dev/null
if ! herdr pane wait-output "$PANE" --match "bypass permissions on" --timeout 90000 >/dev/null 2>&1; then
  echo "ERROR: cc 준비 감지 실패 (pane $PANE 열어둠)"
  herdr pane read "$PANE" --source recent-unwrapped --lines 40
  exit 1
fi
sleep 2
NAME="reviewer-$(date +%H%M%S)"
herdr agent rename "$PANE" "$NAME" >/dev/null

PROMPT="$REQ 파일을 읽고 그 안의 검사 지침을 그대로 수행하라. 결과는 지시된 경로($RES)에 Markdown으로 작성하고, 최종 응답은 결과 파일 경로 한 줄만 출력하라."
herdr agent prompt "$NAME" "$PROMPT" --wait --timeout 900000 > "$DIR/prompt-$TS.json" 2>&1

# 결과 파일 대기 (최대 5분 추가)
for _ in $(seq 1 60); do
  [ -s "$RES" ] && break
  sleep 5
done

if [ -s "$RES" ]; then
  [ -z "$EXPLICIT_RANGE" ] && cp "$DIR/current.txt" "$STATE"
  herdr pane close "$PANE" >/dev/null 2>&1
  echo "RESULT=$RES"
else
  echo "ERROR: 결과 파일 없음 (pane $PANE, agent $NAME 은 열어둠)"
  herdr agent read "$NAME" --source recent-unwrapped --lines 60 2>&1 | tail -40
  exit 1
fi
