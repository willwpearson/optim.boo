import Image from "next/image";

export default function ContactCard({ icon, label, value, href, isExternal }) {
  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const isImageIcon = typeof icon === "string";

  return (
    <a
      href={href}
      className="flex items-center gap-4 p-5 bg-surfaceRaised border border-border rounded-xl hover:border-accent/50 transition-colors"
      {...externalProps}
    >
      <div className="text-accent flex-shrink-0">
        {isImageIcon ? (
          <Image src={icon} alt={label} width={28} height={28} className="opacity-80" />
        ) : (
          (() => {
            const Icon = icon;
            return <Icon className="w-7 h-7" />;
          })()
        )}
      </div>
      <div className="min-w-0">
        <p className="text-textMuted text-xs uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-textPrimary text-sm truncate">{value}</p>
      </div>
    </a>
  );
}
