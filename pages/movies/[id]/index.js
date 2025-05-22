import { getMovieDetails, getAllMovies } from "@/helper/api-helper";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function MovieDetails({ movie }) {
  const router = useRouter();
  const { darkMode } = useTheme();

  if (!movie) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h6" color="error">
          Movie not found.
        </Typography>
      </Container>
    );
  }

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
        {/* Back Button */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
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

        {/* Movie Card */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            {movie.title}
          </Typography>

          <Typography variant="body1" color="text.secondary" gutterBottom>
            {movie.description}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Director: </strong>
            <Link href={`/directors/${movie.directorId}`} passHref>
              <Typography component="span" color="primary" sx={{ cursor: "pointer", textDecoration: "underline" }}>
                {movie.director}
              </Typography>
            </Link>
          </Typography>

          <Typography>
            <strong>Year: </strong> {movie.releaseYear}
          </Typography>
          <Typography>
            <strong>Rating: </strong> {movie.rating}
          </Typography>
          <Typography>
            <strong>Genre: </strong> {movie.genre}
          </Typography>

          <Link href="/" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
            >
              Go Home
            </Button>
          </Link>
        </Paper>
      </Container>
    </Box>
  );
}

export async function getStaticProps({ params }) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movie },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const movies = await getAllMovies();
  const paths = movies.map((movie) => ({
    params: { id: movie._id.toString() },
  }));

  return { paths, fallback: false };
}
