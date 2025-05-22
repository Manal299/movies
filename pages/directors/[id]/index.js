import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { darkMode } = useTheme();

  const { data, error } = useSWR(id ? `/api/directors/${id}` : null, fetcher);

  if (error)
    return (
      <Container sx={{ py: 10 }}>
        <Typography color="error">Failed to load director data</Typography>
      </Container>
    );

  if (!data)
    return (
      <Container sx={{ py: 10 }}>
        <Typography color="text.secondary">Loading director info...</Typography>
      </Container>
    );

  return (
    <Box
      sx={{
        bgcolor: darkMode ? "background.default" : "#f5f5f5",
        color: "text.primary",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* Back to Movies */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <IconButton color="primary" onClick={() => router.push("/movies")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="body1"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/movies")}
          >
            Back to Movies
          </Typography>
        </Stack>

        {/* Director Card */}
        <Card elevation={3} sx={{ p: 4, bgcolor: darkMode ? "grey.900" : "white" }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              {data.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {data.biography}
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Movies Directed:
            </Typography>

            <List dense>
              {data.movies.map((movie) => (
                <ListItem key={movie._id} disableGutters>
                  <Link href={`/movies/${movie._id}`} passHref>
                    <Typography
                      component="a"
                      sx={{
                        color: "primary.main",
                        textDecoration: "underline",
                        "&:hover": { textDecoration: "none" },
                      }}
                    >
                      {movie.title} <span style={{ color: "#888" }}>({movie.releaseYear})</span>
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>

            <Link href="/" passHref>
              <Button variant="contained" sx={{ mt: 4 }}>
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
