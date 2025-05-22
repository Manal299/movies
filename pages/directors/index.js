import useSWR from "swr";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data: directors, error } = useSWR("/api/directors", fetcher);
  const { darkMode } = useTheme();

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography color="error">Failed to load directors.</Typography>
      </Container>
    );
  }

  if (!directors) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography color="text.secondary">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: darkMode ? "background.default" : "#f4f6f8",
        color: "text.primary",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 5,
          }}
        >
          Directors
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {directors.map((director) => (
            <Grid item key={director._id} xs={12} sm={6} md={4} display="flex">
              <Link href={`/directors/${director._id}`} passHref legacyBehavior>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    width: "100%",
                    borderRadius: 3,
                    bgcolor: darkMode ? "grey.900" : "#fff",
                    boxShadow: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardActionArea sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {director.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ minHeight: 72 }}
                      >
                        {director.biography.length > 120
                          ? `${director.biography.slice(0, 120)}...`
                          : director.biography}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
