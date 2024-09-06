/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TypeScript 에러를 경고로 처리
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 경고를 무시
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
