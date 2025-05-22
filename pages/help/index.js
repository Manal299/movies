import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Paper,
} from "@mui/material";

export default function HelpHome() {
  const { darkMode } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "background.default" : "#f4f6f8",
        color: "text.primary",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            bgcolor: darkMode ? "grey.900" : "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            📚 Help Center
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={5}>
            Choose a section below to find the help you need.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
          >
            <Link href="/help/faqs" passHref legacyBehavior>
              <Button variant="contained" color="success">
                FAQs
              </Button>
            </Link>

            <Link href="/help/contact" passHref legacyBehavior>
              <Button variant="contained" color="warning">
                Contact Us
              </Button>
            </Link>

            <Link href="/help/privacy" passHref legacyBehavior>
              <Button variant="contained" color="secondary">
                Privacy Policy
              </Button>
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
