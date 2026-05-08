function RotatingCircleText({
  text = "MINEWORLD • PRODUCTION • CRAFTED IN DELHI • ",
  size = 120,
}) {
  const radius = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  const pathD = `M ${cx}, ${cy} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rotating-circle-text"
      aria-hidden="true"
    >
      <defs>
        <path id="rotating-circle-path" d={pathD} />
      </defs>
      <text
        fill="var(--accent-gold)"
        fontSize="10"
        letterSpacing="3"
        fontWeight="700"
      >
        <textPath href="#rotating-circle-path">{text.repeat(2)}</textPath>
      </text>
      <circle
        cx={cx}
        cy={cy}
        r="4"
        fill="var(--accent-gold)"
        opacity="0.7"
      />
    </svg>
  );
}

export default RotatingCircleText;
