import React from 'react'



export const LoadingSpinner = ({
  size = 40,
  primaryColor = '#3b82f6',
  secondaryColor = '#93c5fd',
  speed = 1,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="url(#gradient)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        style={{
          animation: `spin ${3 / speed}s linear infinite`,
          transformOrigin: 'center',
          strokeDasharray: '80, 125',
        }}
      />
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
            stroke-dashoffset: 0;
          }
          100% {
            transform: rotate(360deg);
            stroke-dashoffset: -205;
          }
        }
      `}</style>
    </svg>
  )
}

