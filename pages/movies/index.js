import { getAllMovies } from "@/helper/api-helper";
import MovieCard from "@/components/MovieCard";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";

import {
  Container,
  Typography,
  Grid,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Movies({ products }) {
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
        {/* Back to Home */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <IconButton color="primary" onClick={() => router.push("/")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="body1"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            Back to Home
          </Typography>
        </Stack>

        {/* Page Heading */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}
        >
          All Movies
        </Typography>

        {/* Movie Grid */}
        <Grid container spacing={4}>
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
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const data = await getAllMovies();
  return {
    props: {
      products: data,
    },
    revalidate: 60,
  };
}
