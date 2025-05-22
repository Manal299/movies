import { getFilteredMovies, getGenreName } from "@/helper/api-helper";
import MovieCard from "@/components/MovieCard";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Genre({ genreName, products }) {
  const { darkMode } = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        bgcolor: darkMode ? "background.default" : "#f5f5f5",
        color: "text.primary",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
          <IconButton color="primary" onClick={() => router.push("/genres")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="body1"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/genres")}
          >
            Back to Genres
          </Typography>
        </Stack>

        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}
        >
          {genreName} Movies
        </Typography>

        {products.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No movies found in this genre.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {products.map((movie) => (
              <Grid item key={movie._id} xs={12} sm={6} md={4}>
                <MovieCard
                  id={movie._id}
                  title={movie.title}
                  year={movie.releaseYear}
                  rating={movie.rating}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const genreId = context.params.id;

  const [movies, genreName] = await Promise.all([
    getFilteredMovies(genreId),
    getGenreName(genreId),
  ]);

  if (!genreName) return { notFound: true };

  return {
    props: {
      products: movies,
      genreName,
    },
  };
}
