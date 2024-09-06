import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col gap-16 justify-center items-center ">
      <h1 className="text-4xl font-semibold">Benefiboard Work</h1>
      <Link href="/cardnews">
        <button className="bg-blue-500 text-white text-2xl p-8 rounded hover:bg-blue-600">
          카드뉴스 프롬프트
        </button>
      </Link>
      <Link href="/imagemake">
        <button className="bg-blue-500 text-white text-2xl p-8 rounded hover:bg-blue-600">
          압축파일이미지합치기
        </button>
      </Link>
    </div>
  );
}
