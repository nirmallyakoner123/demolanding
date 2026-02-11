export default function LightningIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
    >
      <path
        d="M10.2708 1L3.40541 9.55028C3.13653 9.88514 3.0021 10.0526 3.00004 10.194C2.99826 10.3169 3.05104 10.4338 3.14317 10.5111C3.24915 10.6 3.45915 10.6 3.87914 10.6H9.5L8.72917 17L15.5946 8.44972C15.8635 8.11486 15.9979 7.94743 16 7.80603C16.0017 7.68311 15.949 7.56616 15.8568 7.48889C15.7508 7.4 15.5409 7.4 15.1209 7.4H9.5L10.2708 1Z"
        fill="url(#lightning_gradient)"
      />
      <defs>
        <linearGradient
          id="lightning_gradient"
          x1="9.5"
          y1={1}
          x2="9.5"
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38F" />
          <stop offset={1} stopColor="#00A0E2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
