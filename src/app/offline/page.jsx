// app/offline/page.jsx
'use client';
import { useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Box, 
  Chip, 
  Avatar, 
  Slide,
  Fade,
  useTheme,
  styled 
} from '@mui/material';
import { 
  CloudOff, 
  WifiOff, 
  Refresh, 
  Info, 
  Satellite, 
  SignalCellularConnectedNoInternet0Bar 
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Animated gradient background
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(-45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.error.main})`,
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 15s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
}));

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

export default function OfflinePage() {
  const theme = useTheme();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <AnimatedPaper elevation={0}>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50 },
              color: { value: theme.palette.primary.contrastText },
              opacity: { value: 0.5 },
              size: { value: 3 },
              move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: true,
              },
            },
            interactivity: {
              events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
              },
            },
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', height: '100vh', pt: 8 }}>
        <Slide in direction="down" timeout={500}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <CloudOff sx={{ 
              fontSize: 120, 
              color: 'white', 
              animation: `${bounce} 2s infinite`,
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
            }} />
            <Typography variant="h2" sx={{ 
              color: 'white', 
              fontWeight: 700, 
              mt: 2,
              textShadow: '0 0 16px rgba(255,255,255,0.4)'
            }}>
              Connection Lost
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              mt: 2,
              mb: 4 
            }}>
              Oops! It seems you're disconnected from the network
            </Typography>
          </Box>
        </Slide>

        <Fade in timeout={1000}>
          <Grid container spacing={4} sx={{ color: 'white' }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 4, 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(8px)',
                borderRadius: 4
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <WifiOff sx={{ mr: 2, fontSize: 40 }} />
                  <Typography variant="h5">Network Status</Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2,
                  '& .MuiChip-root': {
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }
                }}>
                  <Chip 
                    label="Status: Offline" 
                    color="error" 
                    avatar={<Avatar><Satellite /></Avatar>}
                  />
                  <Chip 
                    label="IP: 0.0.0.0" 
                    variant="outlined"
                  />
                  <Chip 
                    label="Signal Strength: 0%" 
                    variant="outlined"
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 4, 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(8px)',
                borderRadius: 4
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SignalCellularConnectedNoInternet0Bar sx={{ mr: 2, fontSize: 40 }} />
                  <Typography variant="h5">Quick Actions</Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Refresh />}
                    sx={{ 
                      flexGrow: 1,
                      '&:hover': { transform: 'scale(1.05)' },
                      transition: 'transform 0.2s'
                    }}
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<Info />}
                    sx={{ 
                      flexGrow: 1,
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&:hover': { borderColor: 'white' }
                    }}
                  >
                    More Info
                  </Button>
                </Box>

                <Typography variant="body2" sx={{ mt: 3, opacity: 0.8 }}>
                  Last connected: 2 minutes ago
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Fade>

        <Box sx={{ 
          position: 'absolute', 
          bottom: 16, 
          left: 0, 
          right: 0, 
          textAlign: 'center',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <Typography variant="caption">
            Some features may be limited while offline
          </Typography>
        </Box>
      </Container>
    </AnimatedPaper>
  );
}