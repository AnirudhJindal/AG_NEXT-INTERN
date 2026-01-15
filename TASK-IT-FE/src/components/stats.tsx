export const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-slate-300">
    <span>{label}</span>
    <span className="font-medium text-white">{value}</span>
  </div>
)
