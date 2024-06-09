import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

interface DeleteButtonProps {
  onClick: () => void;
  onDeleteSuccess: () => void;
  handleEditeClick: (id: any) => void;
  cardId: string | number;
}

export default function DeleteButton({
  onClick,
  onDeleteSuccess,
  handleEditeClick,
  cardId,
}: DeleteButtonProps) {
  const handleClick = () => {
    onClick(); // Call the onClick function provided by the parent component
    onDeleteSuccess(); // Call the onDeleteSuccess function provided by the parent component
  };

  return (
    <Stack direction="row" spacing={1} className="flex justify-center">
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleClick}
      >
        Delete
      </Button>
      <Button variant="outlined" onClick={() => handleEditeClick(cardId)}>
        Edite
      </Button>
    </Stack>
  );
}
