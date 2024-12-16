
interface UpdateButtonProps {
  name: string;
  data: number;
  onEdit: (id: number) => void
}

export function UpdateButton({
  name,
  data,
  onEdit
}: UpdateButtonProps) {
  return (
    <button
      className="btn-primary me-2"
      onClick={() => onEdit(data)}
    >
      {name}
    </button>
  );
}
