import { useCategories } from "@hooks/useCategories";
import { FilterList } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";

export default function CategoryList() {
  const { categories, isPending } = useCategories();

  if (isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 3, textAlign: "center" }}>
        No Category available!
      </Typography>
    );
  }

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
          {categories.map((category) => (
            <MenuItem key={category.categoryGuid}>
              <ListItemText primary={category.title}></ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Box>
  );
}
