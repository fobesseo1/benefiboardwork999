'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Cardnews() {
  const [subject, setSubject] = useState('');
  const [target, setTarget] = useState('');
  const [writer, setWriter] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const generatePrompt = () => {
    const prompt = `
다음 주제와 타겟에 맞는 카드뉴스 슬라이드 형식의 컨텐츠를 작성해주세요:

**## 주제: [${subject}]**

**## 타겟: [${target}]**

**## 글쓴이: ${writer}**

슬라이드 구성 요청:
위 주제에 대해 5-7장의 슬라이드로 구성된 카드뉴스를 만들어주세요. 각 슬라이드는 다음 구조를 따라야 합니다:

제목과 부제목 슬라이드: 주제를 간결하게 표현하는 제목과 위트있거나 재치있는 부제목
내용 슬라이드: 각각 하나의 핵심 포인트나 정보를 다루는 슬라이드
마무리 슬라이드: 전체 내용을 요약하거나 행동 촉구를 담은 슬라이드

슬라이드 작성 가이드라인:

각 슬라이드 텍스트 길이: 최대 50단어 (또는 한글 기준 150자)
지정된 글쓴이의 역할과 묘사를 반영하여 생각하고 작성할 것
문체: 간결하고 명확한 문장이지만 되도록 독자층이 친숙하게 느끼도록 "~해요"체로 작성. 필요시 핵심 단어나 숫자 강조
구성: 각 슬라이드는 하나의 핵심 아이디어나 정보만 다룰 것
시각화 제안: 각 슬라이드에 어울리는 간단한 아이콘이나 이미지 제안을 한국어로 작성하고, AI 이미지 생성 툴을 위한 간단하고 명확한 영문 이미지 프롬프트도 함께 작성
전체 일관성: 슬라이드 간 연결성을 유지하여 하나의 이야기처럼 구성
제공된 주제 관련 문서(예: 유튜브 프롬프트 또는 블로그 글 등)가 있다면 이를 참고하되 완벽히 따르지는 않을 것
구분이나 차례 표기 방식:

단순 구분을 위해서는 각 항목 앞에 '-'를 사용
순서나 차례를 나타낼 때는 '1), 2), 3)...' 형식을 사용



SEO 최적화를 위한 추가 요청:

게시물 제목: 주요 키워드를 포함하고, 흥미를 유발하는 SEO 최적화된 제목을 작성해주세요. (최대 60자)
메타 디스크립션: 컨텐츠의 핵심을 요약하고 클릭을 유도하는 메타 디스크립션을 작성해주세요. (최대 160자)
내용 요약: 카드뉴스의 주요 내용을 5줄 이내로 요약해주세요. 각 줄은 주요 키워드를 포함하고, 전체 내용을 대표할 수 있어야 합니다. 예시:

인지혁명: 상상력과 언어로 큰 집단 형성
농업혁명: 식량 증가와 불평등의 시작
인류 통합: 돈, 제국, 종교의 역할
과학혁명: '무지'를 인정하며 시작된 발전
미래 전망: 과학기술의 발전과 행복의 의미


해시태그: 컨텐츠와 관련된 주요 키워드를 활용한 5-7개의 해시태그를 제안해주세요.

위 가이드라인에 맞춰 카드뉴스 슬라이드 컨텐츠를 작성해주세요. 각 슬라이드의 내용과 함께 간단한 시각화 아이디어도 제안해주시면 좋겠습니다. 또한, SEO 최적화를 위한 추가 요소들도 함께 제공해주세요.
    `;
    setGeneratedPrompt(prompt);
  };

  const resetForm = () => {
    setSubject('');
    setTarget('');
    setWriter('');
    setGeneratedPrompt('');
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedPrompt)
      .then(() => alert('프롬프트가 클립보드에 복사되었습니다!'))
      .catch((err) => console.error('클립보드 복사 실패:', err));
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>카드뉴스 프롬프트 생성기</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold mb-4">카드뉴스 프롬프트 생성기</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="주제"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="타겟"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="글쓴이"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={generatePrompt}
            className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600"
          >
            생성
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white px-2 rounded hover:bg-gray-600"
          >
            새로 만들기
          </button>
          <Link href="https://downsub.com/" target="_blank" rel="noopener noreferrer">
            <button className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
              유튜브 프롬프트 추출
            </button>
          </Link>
        </div>
        {generatedPrompt && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">생성된 프롬프트:</h2>
            <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{generatedPrompt}</pre>
            <button
              onClick={copyToClipboard}
              className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              복사하기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
