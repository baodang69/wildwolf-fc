import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchInput = ({ width }: { width: any }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Search blog..."
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        display: "flex",
        marginLeft: "auto",
        width: width,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          "& fieldset": {
            borderWidth: 2,
          },
          "&:hover fieldset": {
            borderWidth: 2,
          },
          "&.Mui-focused fieldset": {
            borderWidth: 2,
          },
        },
      }}
    />
  );
};
