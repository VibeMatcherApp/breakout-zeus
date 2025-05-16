export interface IconProps {
  className?: string;
  size?: 18 | 14 | 12;
}
export default function Vibe({ className, size = 18 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      className={className}
      fill="none"
    >
      {/* Background */}
      <rect width="400" height="400" fill="#0A1E3A" />

      {/* Textured Base (Grass-like) */}
      <g transform="translate(0, 300)">
        <rect width="400" height="100" fill="#1E3A5F" />
        <path
          d="M0,100 Q10,80 20,100 T40,100 T60,100 T80,100 T100,100 T120,100 T140,100 T160,100 T180,100 T200,100 T220,100 T240,100 T260,100 T280,100 T300,100 T320,100 T340,100 T360,100 T380,100 T400,100 L400,100 L0,100 Z"
          fill="#2A4D7A"
          opacity="0.8"
        />
      </g>

      {/* Glowing Circles with Pattern */}
      <g transform="translate(200, 200)">
        {/* Left Circle */}
        <circle
          cx="-50"
          cy="0"
          r="80"
          fill="none"
          stroke="#4DA8DA"
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            from="80"
            to="85"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <circle cx="-50" cy="0" r="50" fill="#4DA8DA" opacity="0.3" />
        {/* Right Circle */}
        <circle
          cx="50"
          cy="0"
          r="80"
          fill="none"
          stroke="#4DA8DA"
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            from="80"
            to="85"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <circle cx="50" cy="0" r="50" fill="#4DA8DA" opacity="0.3" />
        {/* Pattern Overlay */}
        <defs>
          <pattern
            id="circlePattern"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="5" cy="5" r="2" fill="#FFFFFF" opacity="0.1" />
          </pattern>
        </defs>
        <circle
          cx="-50"
          cy="0"
          r="80"
          fill="url(#circlePattern)"
          opacity="0.2"
        />
        <circle
          cx="50"
          cy="0"
          r="80"
          fill="url(#circlePattern)"
          opacity="0.2"
        />
      </g>

      {/* Stars */}
      <g fill="#4DA8DA">
        {/* Top */}
        <path d="M200,50 L205,65 L220,65 L207,72 L212,85 L200,75 L188,85 L193,72 L180,65 L195,65 Z" />
        {/* Top Left */}
        <path d="M120,80 L125,95 L140,95 L127,102 L132,115 L120,105 L108,115 L113,102 L100,95 L115,95 Z" />
        {/* Top Right */}
        <path d="M280,80 L285,95 L300,95 L287,102 L292,115 L280,105 L268,115 L273,102 L260,95 L275,95 Z" />
        {/* Middle Left */}
        <path d="M80,160 L85,175 L100,175 L87,182 L92,195 L80,185 L68,195 L73,182 L60,175 L75,175 Z" />
        {/* Middle Right */}
        <path d="M320,160 L325,175 L340,175 L327,182 L332,195 L320,185 L308,195 L313,182 L300,175 L315,175 Z" />
        {/* Bottom Left */}
        <path d="M120,240 L125,255 L140,255 L127,262 L132,275 L120,265 L108,275 L113,262 L100,255 L115,255 Z" />
        {/* Bottom Right */}
        <path d="M280,240 L285,255 L300,255 L287,262 L292,275 L280,265 L268,275 L273,262 L260,255 L275,255 Z" />
        {/* Bottom */}
        <path d="M200,280 L205,295 L220,295 L207,302 L212,315 L200,305 L188,315 L193,302 L180,295 L195,295 Z" />
      </g>
    </svg>
  );
}
