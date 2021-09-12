export default function Indent({
  children,
  className = undefined,
}: {
  children: any;
  className?: String;
}) {
  return (
    <div className={`sm:pl-2 lg:pl-6 box-border ${className}`}>{children}</div>
  );
}
