export default function ButtonFast({
  icon,
  text,
  bgClass,
  textClass,
  borderClass,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`${bgClass} ${textClass} ${borderClass} border rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105 shadow-sm`}
    >
      <div className={textClass}>{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}
