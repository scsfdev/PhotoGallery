import { Box, Paper, Typography } from "@mui/material";

export default function AdminMainPage() {
  return (
    <>
      <Box sx={{ display: "flex", mb: 10 }}>
        <Typography variant="h4">Admin Page</Typography>
      </Box>

      <Box sx={{ display: "flex", mb: 10 }}>
        <Paper sx={{height:300}}>
            <Typography variant="subtitle1">Chart Info</Typography>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{height:200}}>
          <Typography variant="subtitle1">Recent Subscription List</Typography>
        </Paper>
      </Box>
    </>
  );
}
