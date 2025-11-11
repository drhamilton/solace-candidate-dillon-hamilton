interface SpecialtyTagProps {
  specialty: string;
  onClick: () => void;
}

export const SpecialtyTag: React.FC<SpecialtyTagProps> = ({
  specialty,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block mr-1 mb-1 cursor-pointer hover:bg-blue-100 transition-colors"
    >
      {specialty}
    </div>
  );
};
