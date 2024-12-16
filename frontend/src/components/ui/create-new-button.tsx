
interface CreateNewButtonProps {
  onClick: () => void;
}

export function CreateNewButton({ onClick }: CreateNewButtonProps) {
  return (
    <button className="btn-primary mt-3" onClick={() => onClick()}>
      Create new
    </button>
  );
}
