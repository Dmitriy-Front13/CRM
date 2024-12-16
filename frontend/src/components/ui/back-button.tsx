interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      className="btn-warning w-full"
      type="button"
      onClick={onClick}
    >
      Back
    </button>
  );
}