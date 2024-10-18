/*
The code is a TypeScript React component that represents the navigation bar of an application.
It includes the branding, search functionality, and navigation links.
 */

// React imports
import { useState } from "react";

// Navigation imports
import { Link } from "react-router-dom";

// Components and style imports
import { Box, Typography, useTheme, InputBase, IconButton, useMediaQuery } from '@mui/material';
import FlexBetween from "@/components/FlexBetween";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ searchQuery, onSearchChange, onSearchTicker, selectedPage }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // State to manage selected page and mobile menu toggle
  const [selected, setSelected] = useState(selectedPage);
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  // Event handler for search input change, icon click, Enter key and menu item click
  const handleSearch = (event) => {
    onSearchChange(event.target.value);
  };

  const handleSearchIconClick = () => {
    onSearchTicker();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchTicker();
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setSelected(menuItem);
  };

  return (
    <Box 
      gridArea="i" 
      mb="0.25rem" 
      p="0.5rem 0rem" 
      gap="2rem" 
      display="flex" 
      flex="1" 
      color={theme.palette.grey[300]} 
      width="100%" 
      alignItems="center" 
      justifyContent="center"
    >
        
        {/* Icon */}
        <Box gap="0.75rem"  display="flex">
          <QueryStatsIcon sx={{ fontSize: "44px" }} />
          <Typography variant="h4" fontSize="32px">EquityAnalysis</Typography>
        </Box>

        {/* Search Bar */}
        <Box flex={1} sx={{ position: 'relative' }}>
          <InputBase
            placeholder="Enter a stock ticker (Microsoft: MSFT, Tesla: TSLA etc.)..."
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            sx={{
              color: theme.palette.grey[500],
              border: `1px solid ${theme.palette.grey[500]}`,
              borderRadius: '8px',
              padding: '12px 36px 12px 12px',
              width: '100%',
            }}
          />
          <IconButton sx={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }} onClick={handleSearchIconClick}>
            <SearchIcon style={{ color: "#FFF", alignItems: "center" }} />
          </IconButton>
        </Box>
      
      {/* Navigation buttons */}
      {isSmallScreen ? (
        <>
          {!isMenuToggled && (
            <IconButton onClick={() => setIsMenuToggled(true)}>
              <MenuIcon style={{ color: "#FFF" }} />
            </IconButton>
          )}
          {isMenuToggled && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              backgroundColor: "#2d2d34", 
              position: 'fixed', 
              top: 0, 
              right: 0, 
              height: '100vh', 
              width: '25%', 
              zIndex: 1300, 
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease-in-out'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1.2em' }}>
                <IconButton onClick={() => setIsMenuToggled(false)}>
                  <CloseIcon style={{ color: "#FFF" }} />
                </IconButton>
              </Box>
              {/* Menu Items */}
              <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1.2em' }}>
                <Link to="/dashboard" onClick={() => handleMenuItemClick("Dashboard")} style={{ textDecoration: "none" }}>
                  <Typography variant="h4" sx={{ marginBottom: '1rem', color: selected === "Dashboard" ? theme.palette.primary.main : theme.palette.grey[700], '&:hover': { color: theme.palette.primary.main } }}>Dashboard</Typography>
                </Link>
                <Link to="/predictions" onClick={() => handleMenuItemClick("Predictions")} style={{ textDecoration: "none" }}>
                  <Typography variant="h4" sx={{ marginBottom: '1rem', color: selected === "Predictions" ? theme.palette.primary.main : theme.palette.grey[700], '&:hover': { color: theme.palette.primary.main } }}>Predictions</Typography>
                </Link>
                <Link to="/options" onClick={() => handleMenuItemClick("Options")} style={{ textDecoration: "none" }}>
                  <Typography variant="h4" sx={{ marginBottom: '1rem', color: selected === "Options" ? theme.palette.primary.main : theme.palette.grey[700], '&:hover': { color: theme.palette.primary.main } }}>Options Builder</Typography>
                </Link>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <FlexBetween gap="2rem" sx={{ justifyContent: 'flex-end' }} >
          {/* Menu Items */}
          <Link to="/dashboard" onClick={() => handleMenuItemClick("Dashboard")} style={{ textDecoration: "none" }}>
            <Typography variant="h4" component="span" sx={{ '&:hover': { color: theme.palette.primary.main }, color: selected === "Dashboard" ? theme.palette.primary.main : theme.palette.grey[700] }}>Dashboard</Typography>
          </Link>
          <Link to="/predictions" onClick={() => handleMenuItemClick("Predictions")} style={{ textDecoration: "none" }}>
            <Typography variant="h4" component="span" sx={{ '&:hover': { color: theme.palette.primary.main }, color: selected === "Predictions" ? theme.palette.primary.main : theme.palette.grey[700] }}>Predictions</Typography>
          </Link>
          <Link to="/options" onClick={() => handleMenuItemClick("Options")} style={{ textDecoration: "none" }}>
            <Typography variant="h4" component="span" sx={{ '&:hover': { color: theme.palette.primary.main }, color: selected === "Options" ? theme.palette.primary.main : theme.palette.grey[700] }}>Options Builder</Typography>
          </Link>
        </FlexBetween>
      )}
    </Box>
  );
};

export default Navbar;
