import { FilterList } from "@mui/icons-material";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";

export default function CategoryList() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "column",
        gap: 3,
        borderRadius: 3,
      }}
    >
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
        <Typography
          variant="button"
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <FilterList sx={{ mr: 1 }} />
          Categories
        </Typography>
        <MenuList>
          <MenuItem>
            <ListItemText primary="Categories 1"></ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText primary="Categories 2"></ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText primary="Categories 3"></ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Box>
  );
}
