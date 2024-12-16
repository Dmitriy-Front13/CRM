
interface SortButtonProps {
  name: string;
  data: string;
  handleSort: (key: string) => void;
}

export default function SortButton({ name, data, handleSort }: SortButtonProps) {
  return (
    <button
      className="btn btn-link"
      onClick={() => handleSort(data)}
    >
      {name}
    </button>
  );
}
