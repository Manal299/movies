import { getAllGenres } from "@/helper/api-helper";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";

export default function Genres({ products }) {
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
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}
        >
        Browse Genres
        </Typography>

        <Grid container spacing={4}>
          {products.map((genre) => (
            <Grid item key={genre._id} xs={12} sm={6} md={4}>
              <Link href={`/genres/${genre._id}`} passHref>
                <Card
                  sx={{
                    bgcolor: darkMode ? "grey.900" : "white",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "scale(1.02)",
                      transition: "all 0.2s ease-in-out",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        variant="h6"
                        align="center"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      >
                        {genre.name}
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

export async function getServerSideProps() {
  const data = await getAllGenres();

  return {
    props: {
      products: data,
    },
  };
}
