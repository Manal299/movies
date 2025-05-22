import { useRouter } from "next/router";
import { getTrendingMovies } from "@/helper/api-helper";
import MovieCard from "@/components/MovieCard";
import { useTheme } from "@/context/ThemeContext";

import {
  Container,
  Typography,
  Grid,
  Button,
  Stack,
  Box,
  Divider,
} from "@mui/material";

export default function Home({ products }) {
  const router = useRouter();
  const { darkMode } = useTheme();

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
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: darkMode ? "primary.light" : "primary.main",
          }}
        >
          Trending Movies
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Explore the top-rated films loved by everyone!
        </Typography>

        <Divider sx={{ mb: 5 }} />

        {/* Movie Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {products.map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                id={movie._id}
                title={movie.title}
                year={movie.releaseYear}
                rating={movie.rating}
              />
            </Grid>
          ))}
        </Grid>

        {/* Navigation Buttons */}
        <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">
          <Button variant="contained" onClick={() => router.push("/genres")}>
            Browse Genres
          </Button>
          <Button variant="contained" color="success" onClick={() => router.push("/movies")}>
            Show All Movies
          </Button>
          <Button variant="contained" color="secondary" onClick={() => router.push("/directors")}>
            Show All Directors
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => router.push("/help")}>
            Help Center
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const data = await getTrendingMovies();
  return {
    props: {
      products: data,
    },
    revalidate: 60,
  };
}
