export default function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent/40 transition-colors">
      <div className="text-accent mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-textPrimary font-semibold text-lg mb-2">{title}</h3>
      <p className="text-textSecondary text-sm leading-relaxed">{description}</p>
    </div>
  );
}
