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
        backgroundColor: "white",
        marginLeft: "auto",
        width: width,
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          "& fieldset": {
            borderWidth: 1,
          },
          "&:hover fieldset": {
            borderWidth: 1,
          },
          "&.Mui-focused fieldset": {
            borderWidth: 1,
          },
        },
      }}
    />
  );
};
