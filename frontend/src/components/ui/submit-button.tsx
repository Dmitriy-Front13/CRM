

interface SubmitButtonProps {
  id: number;
}

export function SubmitButton({ id }: SubmitButtonProps) {
  return (
    <button type="submit" className="btn-primary w-full">
      {id ? "Update" : "Create"}
    </button>
  );
}
